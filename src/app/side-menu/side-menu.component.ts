import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LinkService, Link } from '../core/site-navigation/link.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Input()
  links: Link[];
  @Input()
  expandido: Boolean;
  @Input()
  config: any;
  constructor(
    private linkService: LinkService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.linkService
      .get({params: {sort: 'order,asc'}})
      .subscribe((links: Link[]) => {
        this.links = links;
      }, error => console.log(error));

    // TODO: implement save to server
    // if (this.menuItems.length <= 0) {
    //     this.menuService.list().toPromise().then((menu: MenuItem[]) => {
    //       this.menuItems = menu;
    //       this.cacheService.setarMenu(menu);
    //     }
    //   );
    // }
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  // Accordion Menu type
  open(menuItem) {
    const expanded = menuItem.expanded;
    this.links.forEach(item => (item.expanded = false));
    menuItem.expanded = !expanded;
  }
}

// ==============================================

export class SideMenuItemComponent extends SideMenuComponent {
  @Input()
  menuItems: any[] = [];

  constructor(linkService: LinkService, _sanitizer: DomSanitizer) {
    super(linkService, _sanitizer);
  }
}
