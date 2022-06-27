import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { GoBackGuard } from './core/guards/go-back.guard';
import { ReverseGuard } from './core/guards/reverse.guard';
import { AddTaskDialogComponent } from './shared/components/add-task-dialog/add-task-dialog.component';
import { LoaderComponent } from './shared/components/loader/loader.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'auth/login',
    pathMatch:'full'
  },
  {
    path:'auth/login',
    loadChildren:()=>import('../app/modules/login/login.module').then((m)=>m.LoginModule),
    canActivate:[ReverseGuard]
  },
  {
    path:'myTask',
    loadChildren:()=>import('../app/modules/my-task/my-task.module').then((m)=>m.MyTaskModule),
    canActivate:[AuthGuard],
    // canDeactivate:[GoBackGuard]
  },
  {
    path:"addTaskDialog",
    component:AddTaskDialogComponent,
  },
  {
    path:'**',
    loadChildren:()=>import('../app/modules/not-found/not-found.module').then((m)=>m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
