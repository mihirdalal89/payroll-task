import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token!:any;
  constructor() {
    this.token = localStorage.getItem('Token');
   }

  isAuthenticated(){
    // console.log(!!this.token)
    return !!localStorage.getItem('Token')
  }
}
