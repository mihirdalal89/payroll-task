import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl:string = environment.baseUrl;
  constructor(private http:HttpClient) { }

  signInUser(data:any): Observable<any>{
      return this.http.post(`${this.baseUrl}api/account/authenticate`,data)
  }

  getTaskAssignedToMe(){
    return this.http.post(`${this.baseUrl}api/Task/UserTasksAssignedByMe`,
    {
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
  }
    )
  }
}
