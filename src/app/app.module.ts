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
import { TaskListModule } from './task-list/task-list.module';


const routes: Routes = [
  { path: '', component: TodosComponent },
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
      FormsModule,
      BrowserAnimationsModule,
      MatSidenavModule,
      MatListModule,
      MatToolbarModule,
      MatButtonModule,
      MatTooltipModule,
      TodosModule,
      SideMenuModule,
      TaskListModule,
      RouterModule.forRoot(routes)
   ],
   schemas: [
      CUSTOM_ELEMENTS_SCHEMA
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }


