import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoginService } from 'src/app/core/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  setImg!:number;
  signInForm!:FormGroup;
  count:number = 0;
  setInterval:any;
  constructor(
    private fb:FormBuilder, 
    private loginService:LoginService,
    private router:Router,
    private ngToastr:NgToastService
    ) { }

  ngOnInit(): void {
    // this.setImg = Math.floor(1+Math.random()*3)
    this.setInterval=setInterval(()=>{
      this.count++
      this.setImg = this.count;
      // console.log(this.count);
      if(this.count == 3){
        this.count=0;
      }
    }, 3000)
    this.createSignInForm();
  }

  ngOnDestroy(): void {
    // clearInterval(this.setInterval);
  }

  createSignInForm(){
    this.signInForm = this.fb.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  signIn(event:any){
    // console.log(this.signInForm.value);
    this.loginService.signInUser(this.signInForm.value).subscribe(res=>{
      if(res.success){
        this.ngToastr.success({detail:"SUCCESS",summary:'Login Successfull'});
        let token = btoa(`${this.signInForm.controls['username'].value}:${this.signInForm.controls['password'].value}`)
        localStorage.setItem('Token',token);
        // console.log('encoded token', token);
        // console.log('ODExMzg5OTIwNjoxMjM0NTY3OA=='==token)
        this.router.navigate(['/myTask'])
      }
      (err:any)=>{
        this.ngToastr.success({detail:"ERROR",summary:err});
      }
    })
  }
}
