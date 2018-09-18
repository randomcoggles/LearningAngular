import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CacheMenuService, MenuItem } from '../../../core/site-navigation/cache-menu.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { startWith, map } from 'rxjs/operators';
import { Observable, of} from 'rxjs';

@Component({
  selector: 'app-create-link',
  templateUrl: './create-link.component.html',
  styleUrls: ['./create-link.component.scss']
})
export class CreateLinkComponent implements OnInit {
  linksForm: FormGroup;
  codepoints = <any>[];
  codepointsObservable: Observable<any[]>;
  constructor(
    private cacheMenuService: CacheMenuService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateLinkComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any, private http: HttpClient) { }

  ngOnInit() {

    this.linksForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      path: ['', Validators.required],
      disable:  [''],
      expanded:  [false],
      icon:  [''],
      iconUrl: [''],
      order: ['']
    });
    // TODO: Create a service for this.
    this.http.get('assets/json/icons-codepoints.json').
    subscribe((results) => {
      this.codepoints = results;
      this.linksForm.get('icon').valueChanges.
      subscribe(value => {
        this.codepointsObservable = of(this._filter(value));
      });
    });

  }

  private _filter(filterTerm: string) {
    const filterTermLc = (filterTerm || '').toLowerCase();
    console.log('filterTermLc: ', filterTermLc);
    const topValues = [];
    const arrayOfSomething = this.codepoints.filter((value: string) => {
      const match = (value && value[0]).toLowerCase().indexOf(filterTermLc) > -1;
      if (!match) { return false; }
      const startsWith = (value && value[0]).toLowerCase().startsWith(filterTermLc);
      if (startsWith) {
        topValues.push(value);
        return false;
      }
      return match;
    });

    console.log('arrayOfSomething: ', arrayOfSomething);
    return [...topValues, ...arrayOfSomething];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.linksForm.invalid) { return; }
    this.cacheMenuService.add(this.linksForm.value).then((menuItem) => {
      this.linksForm.reset();
    });
  }
}
