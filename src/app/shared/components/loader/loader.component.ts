import { Component, DoCheck, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  isloading!:Boolean;
  constructor(private loaderService:LoaderService) { 
   this.loaderService.isLoading.subscribe((res:Boolean)=>{
      // console.log("djad",res);
      this.isloading = res
    })
  }

  ngOnInit(): void {
    
  }

  
}
