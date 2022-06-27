import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../modules/angular-material/angular-material.module';

import { LoaderComponent } from './components/loader/loader.component';
import { AddTaskDialogComponent } from './components/add-task-dialog/add-task-dialog.component';
import { AddUsersDialogComponent } from './components/add-users-dialog/add-users-dialog.component';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';


@NgModule({
  declarations: [
    LoaderComponent,
    AddTaskDialogComponent,
    AddUsersDialogComponent,
    NumbersOnlyDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  exports:[

    LoaderComponent,
    AddTaskDialogComponent,
    AddUsersDialogComponent,
    NumbersOnlyDirective,

    ReactiveFormsModule
  ],
  entryComponents:[
    AddTaskDialogComponent,
    AddUsersDialogComponent,
  ]
})
export class SharedModule { }
