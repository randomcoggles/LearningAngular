import { Component, AfterContentInit, ElementRef, ViewChild } from '@angular/core';
import { TodosComponent } from './todos/todos.component';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  title = 'Learning Angular by Example.';
  events: string[] = [];
  opened = true;
  sideNavConfig = {
    icons: {hidden: false  },
    labels: {hidden: false}
  };

  // @ViewChild('sidenav', {read: ElementRef}) sidenav: MatSidenav;
  @ViewChild('sidenav') public sidenav: MatSidenav;

  ngAfterContentInit() {
    this.opened = false;

    setTimeout(() => {
      this.toggleLabels();
    }, 1500);
  }

  toggleLabels() {
    // TODO: ...
    // setTimeout(() => {
      let taFechando = false;
    if ( !this.sideNavConfig.labels.hidden ) {
      this.sideNavConfig.labels.hidden = true;
      taFechando = true;
    }

    this.sidenav.close().then(() => {
      if ( taFechando ) {
        setTimeout(() => {
          this.opened = true; // this.sidenav.open();
        }, 1000);

        return;
      }
      this.sideNavConfig.labels.hidden = false;
      this.sidenav.open();
    });
  }


}
