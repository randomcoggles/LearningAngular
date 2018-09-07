import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { TodosModule } from './todos/todos.module';
import { AngularSamplesComponent } from './angular-samples/angular-samples.component';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { SideMenuModule } from './side-menu/side-menu.module';
import { SiteNavigationModule } from './admin/site-navigation/site-navigation.module';
import { InterceptorsModule } from './core/interceptors/interceptors.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './core/interceptors/api-interceptor';
import { AdminModule } from './admin/admin.module';


const routes: Routes = [
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
   declarations: [
      AppComponent,
      HeroesComponent,
      HeroDetailComponent,
      MessagesComponent,
      AngularSamplesComponent
   ],
   imports: [
      BrowserModule,
      CoreModule,
      HttpClientModule,
      InterceptorsModule,
      FormsModule,

      BrowserAnimationsModule,
      AdminModule,

      MatSidenavModule,
      MatListModule,
      MatToolbarModule,
      MatButtonModule,
      MatTooltipModule,
      TodosModule,
      SideMenuModule,
      SiteNavigationModule,
      RouterModule.forRoot(routes)
   ],
   schemas: [
      CUSTOM_ELEMENTS_SCHEMA
   ],
   providers: [
    {
     provide: HTTP_INTERCEPTORS,
     useClass: ApiInterceptor,
     multi: true,
    }],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }


