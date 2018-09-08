import { Component, OnInit, Input } from '@angular/core';
import {
  MenuItem,
  CacheMenuService
} from '../core/site-navigation/cache-menu.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Input()
  menuItems: MenuItem[];
  @Input()
  expandido: Boolean;
  @Input()
  config: any;
  constructor(
    private cacheMenuService: CacheMenuService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.cacheMenuService
      .getAll()
      .then((menuItems: MenuItem[]) => {
        this.menuItems = menuItems;
      })
      .catch(ex => {
        console.log(ex);
      });

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
    this.menuItems.forEach(item => (item.expanded = false));
    menuItem.expanded = !expanded;
  }
}

// ==============================================

export class SideMenuItemComponent extends SideMenuComponent {
  @Input()
  menuItems: any[] = [];

  constructor(cacheMenuService: CacheMenuService, _sanitizer: DomSanitizer) {
    super(cacheMenuService, _sanitizer);
  }
}
