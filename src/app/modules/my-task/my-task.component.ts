import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LoginService } from 'src/app/core/login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from 'src/app/shared/components/add-task-dialog/add-task-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MyTaskService } from 'src/app/core/myTask/my-task.service';
// import { ToastrService } from 'ngx-toastr';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Title', 'Customer Name', 'Assigned By', 'Assigned Date', 'Due Date', 'Priority', 'Status','action'];
  public dataSource:any;
  data!:any;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private authService:AuthService,
    private loginService:LoginService, 
    private matDialog:MatDialog, 
    private myTaskService:MyTaskService,
    // private toastr:ToastrService
    private ngToastr:NgToastService,
    private router:Router,
    ) { }

  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource(this.userData);
    this.authService.isAuthenticated();
    this.myTaskService.showAssignedTasks().subscribe((res:any)=>{
    this.data = res['data'].TaskList
    // console.log(res['data'].TaskList);
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort;
    // this.toastr.success('test')
    // this.ngToastr.error({detail:"SUCCESS",summary:'Your Success Message'});
  })
  // console.log(this.data);
  }

  ngAfterViewInit(): void {
  }
  
  openDialog(){
    // this.router.navigate(['/addTaskDialog'])
    const dialogRef = this.matDialog.open(AddTaskDialogComponent,{
      disableClose:true,
      width: '700px',
    })

    this.myTaskService.isDialogClosed.subscribe(res=>{
      // console.log("beh", res);
      if(res){
        this.ngOnInit();
      }
    })
    this.myTaskService.isDialogClosed.next(false)
  }

  deleteTask(event:any){
    // console.log(event.TaskId);
    this.myTaskService.deleteTask(event.TaskId).subscribe((res:any)=>{
      if(res['Status']==200){
        this.ngToastr.success({detail:"SUCCESS",summary:'Record Deleted'});
        this.ngOnInit();
      }
    },
    (err)=>{
      this.ngToastr.error({detail:"ERROR",summary:err});
    }
    )
  }

  logout(){
    console.log("logout");
    localStorage.removeItem('Token');
    this.router.navigate(['/auth/login']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
