import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyTaskService } from 'src/app/core/myTask/my-task.service';

@Component({
  selector: 'app-add-users-dialog',
  templateUrl: './add-users-dialog.component.html',
  styleUrls: ['./add-users-dialog.component.css']
})
export class AddUsersDialogComponent implements OnInit {

  addUser!:FormGroup;
  members:any;
  selectedUsers:Array<any>=[]
  constructor(
    public dialogRef: MatDialogRef<AddUsersDialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private myTaskService:MyTaskService
  ) {
    this.addUser=this.fb.group({
      addusersData:['',],
    })
   }

  ngOnInit(): void {
    this.myTaskService.getCompanyMembers().subscribe((res:any)=>{
     this.members = res['data'].Members;
    })
  }

  done(){
    // console.log(this.addUser.controls['addusersData'].value)
    // let data = {
    //   username:'john doe',
    //   email:'johndoe@gmail.com'
    // }
    this.dialogRef.close(this.selectedUsers)
  }

  onChange(event:any){
    // console.log(event.source.id + " " + event.source.name + " " + event.source._checked);
    let data = {
      id:event.source.id,
      name:event.source.name,
      // isChecked:event.source._checked
    }
    this.selectedUsers.push(data)
  }
}
