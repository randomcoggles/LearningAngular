import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CacheMenuService, MenuItem } from '../../../core/site-navigation/cache-menu.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menus.component.html',
  styleUrls: ['./create-menus.component.scss']
})
export class CreateMenuComponent implements OnInit {
  menuForm: FormGroup;
  constructor(
    private cacheMenuService: CacheMenuService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateMenuComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.menuForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      path: ['', Validators.required],
      disable:  [''],
      expanded:  [false],
      icon:  [''],
      iconUrl: ['']
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.menuForm.invalid) { return; }
    this.cacheMenuService.add(this.menuForm.value).then((menuItem) => {
      this.menuForm.reset();
    });
  }
}
