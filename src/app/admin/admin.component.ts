import { Component, OnInit } from '@angular/core';
import { LoadSeedDataService } from '../seed-data/load-seed-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private loadSeedDataService: LoadSeedDataService) { }

  backupData() {
    this.loadSeedDataService.downloadDataBase();
  }

  ngOnInit() {
  }

}
