import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyTaskService {
  baseUrl:string = environment.baseUrl;
  isDialogClosed = new BehaviorSubject<boolean>(false)
 
  params = new HttpParams()
    .set('from', 1)
    .set('text','')
    .set('to', 100)

  constructor(private http:HttpClient) { }

  getLeads() {
    return this.http.post(`${this.baseUrl}api/CRM/Leads`,
      {
        "From": 1,
        "To": -1,
        "Text": ""
      })
  }

  getCompanyMembers(){
    return this.http.get(`${this.baseUrl}api/CompanyMembers?from=1&text=&to=100`,)
  }

  assignTask(data:any){
    return this.http.post(`${this.baseUrl}api/Task/AssignTask`,data)
  }

  showAssignedTasks(){
    return this.http.post(`${this.baseUrl}api/Task/UserTasksAssignedByMe`,{
        "From": 1,
        "To": 100,
        "Title": "",
        "UserId": "",
        "IsArchive": false,
        "UserIds": [],
        "Priority": "",
        "TaskStatus": "",
        "FromDueDate": "",
        "ToDueDate": "",
        "SortByDueDate": ""
    })
  }

  deleteTask(taskId:any){
    return this.http.get(`${this.baseUrl}api/Task/DeleteTask?taskId=${taskId}`)
  }
}
