import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CacheMenuService, MenuItem } from '../../../core/site-navigation/cache-menu.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { startWith, map } from 'rxjs/operators';
import { Observable, of} from 'rxjs';
import { Link } from '../../../core/backend/apis/links/index';
import { LinkService } from '../../../core/site-navigation/link.service';

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
    private linkService: LinkService,
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
      showAt: [''],
      order: [, Validators.min(1)]
    } );
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

    return [...topValues, ...arrayOfSomething];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.linksForm.invalid) { return; }
    this.linkService.add(this.linksForm.value).subscribe((item) => {
      if (item) {
        alert('This item was created successfully'); // FIXME: Standardize these messages. Don't user alert
        this.dialogRef.close();
      } else {
        alert('This item wasn\'t created!'); // FIXME: Standardize these messages. Don't user alert
      }
    },
    error => alert(error)); // FIXME: Standardize these messages. Don't user alert
  }
}
