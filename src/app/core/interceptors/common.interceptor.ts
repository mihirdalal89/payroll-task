import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../loader/loader.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService, private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(request);
    this.loaderService.show()
    this.loaderService.isLoading.subscribe(res=>{
      // console.log("from", res);
  })
    request = request.clone(
      {
        setHeaders: {
          Authorization: `Basic ${localStorage.getItem('Token')}`
        }
      }
    )

    return next.handle(request).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
}
