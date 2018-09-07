import { Component, OnInit } from '@angular/core';
import { LinkService, Link } from '../../core/site-navigation/link.service';

@Component({
  selector: 'app-site-navigation',
  templateUrl: './site-navigation.component.html',
  styleUrls: ['./site-navigation.component.css']
})
export class SiteNavigationComponent implements OnInit {

  constructor(private linkServce: LinkService) { }

  ngOnInit() {
  }

  makeCall(): void {
    const subscription = this.linkServce.get<Link>('').
      subscribe((links: Link[]) => {
        console.log(links);
        subscription.unsubscribe();
    });
  }

}
