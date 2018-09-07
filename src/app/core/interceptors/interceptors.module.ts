import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './api-interceptor';

@NgModule({
  providers: [
    {
     provide: HTTP_INTERCEPTORS,
     useClass: ApiInterceptor,
     multi: true,
    },
  ],
})
export class InterceptorsModule { }
