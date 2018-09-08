import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChecklistItemService } from '../checklist-item.service';

@Component({
  selector: 'app-create-checklist-item',
  templateUrl: './create-checklist-item.component.html',
  styleUrls: ['./create-checklist-item.component.scss']
})
export class CreateChecklistItemComponent {
  form: FormGroup;
  constructor(
    fb: FormBuilder,
    private checklistItemService: ChecklistItemService,
    public dialogRef: MatDialogRef<CreateChecklistItemComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.form = fb.group({
      title: ['', Validators.required],
      description: [''],
      done: ['']
    });
    window['components'] = window['components'] || {};
    window['components'].CreateChecklistItemComponent = this;
  }


  submit() {
    if (this.form.invalid) {
      return;
    }

    this.checklistItemService
      .add(this.form.value)
      .then( response => {
        alert('Dados enviados com sucesso');
        this.dialogRef.close();
      })
      .catch(error => alert(error));
  }
}
