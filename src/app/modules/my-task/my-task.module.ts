import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTaskComponent } from './my-task.component';
import { RouterModule, Routes } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

const routes:Routes = [
  {
    path:'',
    component:MyTaskComponent,
  }
]

@NgModule({
  declarations: [
    MyTaskComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule.forChild(routes),
  ]
})
export class MyTaskModule { }
