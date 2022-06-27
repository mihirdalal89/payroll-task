import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AddTaskDialogComponent } from 'src/app/shared/components/add-task-dialog/add-task-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class GoBackGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: AddTaskDialogComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return true
  }
  
}
