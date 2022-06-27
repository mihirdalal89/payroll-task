import { Component, OnInit, Inject } from '@angular/core';
import { DialogRole, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyTaskService } from 'src/app/core/myTask/my-task.service';
import { AddUsersDialogComponent } from '../add-users-dialog/add-users-dialog.component';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css'],
})
export class AddTaskDialogComponent implements OnInit {
  fileName:any = '';
  isFileAttached!:boolean;
  leadNames:any=[];
  minDate = new Date;
  priorities = [
    {
      priority:'High Priority',
      priorityValue:'High'
    },
    {
      priority:'Low Priority',
      priorityValue:'Low'
    }
  ]
  users:any;
  ccMembers:any;
  myTask!:FormGroup;
  basee64String:Array<any>=[];
  file:any
  userIds:Array<any>=[];
  ccMemberss:Array<any>=[];
  constructor(
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private myTaskService:MyTaskService,
    private matDialog:MatDialog,
    private fb:FormBuilder,
    private ngToastr:NgToastService
  ) { }

  ngOnInit(): void {
    this.myTask = this.fb.group({
      Title:['',[Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      Description:['',[Validators.required]],
      Image:['',[Validators.required]],
      LeadId:['',[Validators.required]],
      TaskEndDate:['',[Validators.required]],
      Priority:['',[Validators.required]],
      AddUsers:['',[]],
      AddCCMembers:['',[]],
    })
    this.getleads()
  }

  fileDataUpload(event: any) {
    this.file = event.target.files[0];
    let sizes = event.target.files[0].size;
    let size = (Math.round((sizes / 1024)));

    if (size < 2000) {
      this.fileName = event.target.files[0].name;
      if (this.fileName) {
        this.isFileAttached = true
      }

      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(event.target.files[0]);
    }else{
      this.myTask.controls['Image'].reset()
      this.ngToastr.error({detail:"ERROR",summary:'File size Should be less than 2mb'});
    }


  }

  _handleReaderLoaded(readerEvt:any) {
    var binaryString = readerEvt.target.result;
    this.basee64String.push(`data:${this.file.type};base64,`+btoa(binaryString))
    // console.log(this.basee64String[0]);
   }

  openFileUpload(){

  }

  getleads(){
    this.myTaskService.getLeads().subscribe((res:any)=>{
      // if(res.Status=200){
        this.leadNames = res['data'].Leads
        // for(let i = 0; i < res['data'].TotalRecords; i++){
          // this.leadNames. res['data'].Leads
          // this.leadNames.push(res['data'].Leads[i].LeadName)
        // }
      // }
      // console.log(this.leadNames);
    })
  }

  openAddUsersDialog(){
    const dialogRef = this.matDialog.open(AddUsersDialogComponent,{
      width: '300px',
    })

    dialogRef.afterClosed().subscribe(res=>{
      for(let user of res){
        // console.log("log",user);
        this.userIds.push(user.id)
      }
      // console.log("userids",this.userIds);
      this.users = res.length
      // console.log("from users", res);
    })
  }

  openCCMembersDialog(){
    const dialogRef = this.matDialog.open(AddUsersDialogComponent,{
      width: '300px',
    })

    dialogRef.afterClosed().subscribe(res=>{
      this.ccMembers = res.length
      this.ccMemberss = res;
      // console.log("cc",this.ccMemberss);
      // console.log("from users", res);
    })
  }

  addMyTask(){
    // console.log('clicked',this.myTask.value);
    // let date = this.customDateFun(this.myTask.controls['TaskEndDate'].value,0,'d MMM yyyy hh:mm a')
    let date = new Date(this.myTask.controls['TaskEndDate'].value)
    let strDate = date.toDateString()
    // console.log(strDate);
    let month = strDate.slice(4,8);
    let day = strDate.slice(8,11);
    let year=strDate.slice(-4);
    let finalDate=day + "" + month + "" + year + " 12:00 AM"
    // console.log("final date",finalDate);
    let data={
      Title: this.myTask.controls['Title'].value,
      Description: this.myTask.controls['Description'].value,
      Image: this.basee64String,
      LeadId: this.myTask.controls['LeadId'].value,
      TaskEndDate: '26 Jun 2022 12:00 AM',
      Priority:this.myTask.controls['Priority'].value,
      UserIds: this.userIds,
      TaskOwners:this.ccMemberss
    }

    let anotherData=
      {
        "Id": "",
        "AssignedBy": 102,
        "AssignedToUserId": "",
        "AssignedDate": "",
        "CompletedDate": "",
        "Description": this.myTask.controls['Description'].value,
        "IntercomGroupIds": [],
        "IsActive": true,
        "Latitude": "",
        "Location": "",
        "Longitude": "",
        "Image": (this.basee64String?this.basee64String:""),
        "MultimediaData": "",
        "MultimediaExtension": "",
        "MultimediaFileName": "",
        "MultimediaType": "",
        "Priority": this.myTask.controls['Priority'].value,
        "TaskEndDateDisplay": this.myTask.controls['TaskEndDate'].value,
        "TaskEndDate": finalDate,
        "TaskDisplayOwners": `${this.ccMembers} User`,
        "TaskOwners": this.ccMemberss,
        "TaskStatus": "",
        "Title": this.myTask.controls['Title'].value,
        "UserDisplayIds": `${this.users} User`,
        "UserIds": this.userIds,
        "LeadId": this.myTask.controls['LeadId'].value
    }
    
    this.myTaskService.assignTask(anotherData).subscribe((res:any)=>{
      // console.log("assign task", res['Status']);
      if(res['Status']==200){
        this.ngToastr.success({detail:"SUCCESS",summary:'Task Added Successfully'});
        this.myTaskService.isDialogClosed.next(true);
      }
    })

    // console.log("final data", anotherData);
  }

  getLeadId(event:any){
    // console.log(event);
  }

  cancelFile(){
    this.isFileAttached=false
    this.fileName=""
    this.myTask.controls['Image'].reset();
    this.basee64String = []
  }
  // customDateFun(date: any, day: number, format: any='d MMM y'){
  //   date = new Date(date);
  //   date.setDate(date.getDate()-day);
  //   return new Date(date, format);
  // }

  // canExit() : boolean {
 
  //   if (confirm("Do you wish to Please confirm")) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   } 
  
    checkFormDirty(){
      if(this.myTask.dirty){
        alert("Really want to leave")
      }
    }
}
