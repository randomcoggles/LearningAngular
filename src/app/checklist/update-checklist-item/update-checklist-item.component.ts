import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CacheMenuService,
  MenuItem
} from '../../core/site-navigation/cache-menu.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChecklistItemService, ChecklistItem } from '../checklist-item.service';

@Component({
  selector: 'app-update-checklist-item',
  templateUrl: './update-checklist-item.component.html',
  styleUrls: ['./update-checklist-item.component.scss']
})
export class UpdateChecklistItemComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private checklistItemService: ChecklistItemService,
    public dialogRef: MatDialogRef<UpdateChecklistItemComponent>,
    @Inject(MAT_DIALOG_DATA) public checklistItem: ChecklistItem
  ) {
    this.form = fb.group({
      title: [checklistItem.title, Validators.required],
      description: [checklistItem.description],
      done: [checklistItem.done]
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.checklistItemService
      .update(this.checklistItem.id, this.form.value)
      .then(updated => {
        if (updated) {
          alert('Dados atualizados com sucesso');
          this.dialogRef.close();
        } else {
          alert('This item wasn\'t updated!');
        }
      })
      .catch(error => alert(error));
  }
}
