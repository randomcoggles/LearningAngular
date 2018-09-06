import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/user/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  form: FormGroup;
  constructor(userService: UserService, fb: FormBuilder) { 
    this.form = fb.group({
      username: ['']
    });
  }

  ngOnInit() {
  }

}
