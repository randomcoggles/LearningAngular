import { NgModule } from '@angular/core';
import { AlertComponent } from './alert.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule],
  declarations: [AlertComponent],
  exports: [AlertComponent]
})
export class AlertModule {}
