import { Component, OnInit } from '@angular/core';
import { LoadSeedDataService } from '../../seed-data/load-seed-data.service';

@Component({
  selector: 'app-data-management',
  templateUrl: './data-management.component.html',
  styleUrls: ['./data-management.component.css']
})
export class DataManagementComponent implements OnInit {

  constructor(private loadSeedDataService: LoadSeedDataService) { }

  ngOnInit() {
  }
  backupData() {
    this.loadSeedDataService.downloadDataBase();
  }

}
