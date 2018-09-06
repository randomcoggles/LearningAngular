import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSamplesComponent } from './angular-samples.component';
import { MatListModule, MatNavList } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatListModule
  ],
  exports: [
    MatListModule
  ],
  declarations: [AngularSamplesComponent]
})
export class AngularSamplesModule { }
