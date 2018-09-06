import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from './menu.service';
import { CacheMenuService, MenuItem } from './cache-menu.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  @Input() menuItems: MenuItem[];
  @Input() expandido: Boolean;

  constructor(private menuService: MenuService, private cacheMenuService: CacheMenuService) { }

  ngOnInit() {
    this.cacheMenuService.getAll().then((menuItems: MenuItem[]) => {
      this.menuItems = menuItems;
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

  // Accordion Menu type
  open(menuItem) {
    const expanded = menuItem.expanded;
    this.menuItems.forEach(item => item.expanded = false);
    menuItem.expanded = !expanded;
  }

  // getIcon(menuItem: MenuItem): string {
  //   if ( !iconeStr || iconeStr === 'subcat') { return 'fa fa-circle'; }
  //   return iconeStr;
  // }

}

// ==============================================


export class SideMenuItemComponent extends SideMenuComponent {

  @Input() menuItems: any[] = [];

  constructor( menuService: MenuService, cacheMenuService: CacheMenuService) {
    super(menuService, cacheMenuService);
  }

}
