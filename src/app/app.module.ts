import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { SharedModule } from './shared/shared.module';
import { CommonInterceptor } from './core/interceptors/common.interceptor';
import { NgToastModule } from 'ng-angular-popup';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    SharedModule,
    HttpClientModule,
    // ToastrModule.forRoot(),
    NgToastModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:CommonInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
