import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../menu.service';
import { CacheMenuService } from '../../cache-menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateMenuComponent implements OnInit {
  menuForm: FormGroup;
  constructor(private menuService: MenuService/*TODO: server persistence*/, cacheMenuService: CacheMenuService, private fb: FormBuilder) { }

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

}
