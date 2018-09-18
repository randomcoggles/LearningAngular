
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Link, LinkService } from '../../../core/site-navigation/link.service';

@Component({
  selector: 'app-update-menus',
  templateUrl: './update-menus.component.html',
  styleUrls: ['./update-menus.component.scss']
})
export class UpdateMenusComponent {

  menuForm: FormGroup;

  constructor(
    // private menuService: MenuService/*TODO: server persistence*/,
    private linkService: LinkService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateMenusComponent>,
    @Inject(MAT_DIALOG_DATA) public link: Link) {

      this.menuForm = fb.group({
        id: [link.id],
        title: [link.title, Validators.required],
        description: [link.description, Validators.required],
        path: [link.path, Validators.required],
        disable:  [link.disable],
        expanded:  [link.expanded],
        icon:  [link.icon],
        iconUrl: [link.iconUrl],
        order: [link.order]
      });

  }

  submit() {

    if (this.menuForm.invalid) { return; }
    this.linkService.update(this.menuForm.value).
      subscribe((updated) => {
        console.log('updated:\t', updated);
        if (updated) {
          alert('Dados atualizados com sucesso');
          this.dialogRef.close();
        } else {
          alert('This item wasn\'t updated!');
        }
      },
      error => alert(error));
  }

}
