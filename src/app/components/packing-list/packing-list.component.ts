import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PackingHelperService } from 'src/app/services/packing-helper.service';
import { ValueHelpItem } from 'src/app/types/value-help-item';

@Component({
  selector: 'app-packing-list',
  templateUrl: './packing-list.component.html',
  styleUrls: ['./packing-list.component.scss'],
})
export class PackingListComponent implements OnInit {
  accomodations$!: Observable<ValueHelpItem[]>;
  activities$!: Observable<ValueHelpItem[]>;
  transports$!: Observable<ValueHelpItem[]>;
  tripTypes$!: Observable<ValueHelpItem[]>;
  weathers$!: Observable<ValueHelpItem[]>;

  constructor(private packingHelper: PackingHelperService) {}

  ngOnInit(): void {
    this.accomodations$ = this.packingHelper.getAccomodations();
    this.activities$ = this.packingHelper.getActivities();
    this.transports$ = this.packingHelper.getTransports();
    this.tripTypes$ = this.packingHelper.getTripTypes();
    this.weathers$ = this.packingHelper.getWeathers();
  }
}
