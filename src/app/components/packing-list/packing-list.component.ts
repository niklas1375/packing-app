import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { PackingHelperService } from 'src/app/services/packing-helper.service';
import { ValueHelpItem } from 'src/app/types/value-help-item';

@Component({
  selector: 'app-packing-list',
  templateUrl: './packing-list.component.html',
  styleUrls: ['./packing-list.component.scss'],
})
export class PackingListComponent implements OnInit {
  tripTypeGroup = this._formBuilder.group({

  });
  accomodationGroup = this._formBuilder.group({

  });
  transportGroup = this._formBuilder.group({

  });
  activitiesGroup = this._formBuilder.group({

  });
  weatherGroup = this._formBuilder.group({

  });

  accomodations$!: Observable<ValueHelpItem[]>;
  activities$!: Observable<ValueHelpItem[]>;
  transports$!: Observable<ValueHelpItem[]>;
  tripTypes$!: Observable<ValueHelpItem[]>;
  weathers$!: Observable<ValueHelpItem[]>;

  constructor(private _formBuilder: FormBuilder,private packingHelper: PackingHelperService) {}

  ngOnInit(): void {
    this.accomodations$ = this.packingHelper.getAccomodations();
    this.activities$ = this.packingHelper.getActivities();
    this.transports$ = this.packingHelper.getTransports();
    this.tripTypes$ = this.packingHelper.getTripTypes();
    this.weathers$ = this.packingHelper.getWeathers();
  }
}
