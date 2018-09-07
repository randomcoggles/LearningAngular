
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CacheMenuService, MenuItem } from '../../../core/site-navigation/cache-menu.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-update-menus',
  templateUrl: './update-menus.component.html',
  styleUrls: ['./update-menus.component.scss']
})
export class UpdateMenusComponent {

  menuForm: FormGroup;

  constructor(
    // private menuService: MenuService/*TODO: server persistence*/,
    private cacheMenuService: CacheMenuService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateMenusComponent>,
    @Inject(MAT_DIALOG_DATA) public menuItem: MenuItem) {

      this.menuForm = fb.group({
        title: [menuItem.title, Validators.required],
        description: [menuItem.description, Validators.required],
        path: [menuItem.path, Validators.required],
        disable:  [menuItem.disable],
        expanded:  [menuItem.expanded],
        icon:  [menuItem.icon],
        iconUrl: [menuItem.iconUrl]
      });

  }

  submit() {

    if (this.menuForm.invalid) { return; }
    this.cacheMenuService.update(this.menuItem.id, this.menuForm.value).
      then((updated) => {
        if (updated) {
          alert('Dados atualizados com sucesso');
          this.dialogRef.close();
        } else {
          alert('This item wasn\'t updated!');
        }
      }).
      catch(error => alert(error));
  }

}
