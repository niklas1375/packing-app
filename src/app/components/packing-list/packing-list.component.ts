import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { PackingHelperService } from 'src/app/services/packing-helper.service';
import { UserSelectionService } from 'src/app/services/user-selection.service';
import { UserChoice } from 'src/app/types/user-choice';
import { ValueHelpItem } from 'src/app/types/value-help-item';

@Component({
  selector: 'app-packing-list',
  templateUrl: './packing-list.component.html',
  styleUrls: ['./packing-list.component.scss'],
})
export class PackingListComponent implements OnInit {
  tripBasicsGroup = this._formBuilder.group({
    tripNameCtrl: ['', Validators.required],
    tripStartCtrl: ['', Validators.required],
    tripEndCtrl: ['', Validators.required],
  });
  tripTypeGroup = this._formBuilder.group({
    tripTypeCtrl: ['', Validators.required],
  });
  accomodationGroup = this._formBuilder.group({
    accomodationCtrl: ['', Validators.required],
  });
  transportGroup = this._formBuilder.group({
    transportCtrl: ['', Validators.required],
  });
  activitiesGroup = this._formBuilder.group({});
  weatherGroup = this._formBuilder.group({});

  accomodations$!: Observable<ValueHelpItem[]>;
  activities$!: Observable<ValueHelpItem[]>;
  transports$!: Observable<ValueHelpItem[]>;
  tripTypes$!: Observable<ValueHelpItem[]>;
  weathers$!: Observable<ValueHelpItem[]>;

  constructor(
    private _formBuilder: FormBuilder,
    private packingHelper: PackingHelperService,
    private router: Router,
    private userSelectionService: UserSelectionService
  ) {}

  ngOnInit(): void {
    this.accomodations$ = this.packingHelper.getAccomodations();
    this.activities$ = this.packingHelper.getActivities();
    this.transports$ = this.packingHelper.getTransports();
    this.tripTypes$ = this.packingHelper.getTripTypes();
    this.weathers$ = this.packingHelper.getWeathers();
  }

  newFormControl(key: string, formGroup: FormGroup): FormControl {
    return <FormControl>formGroup.registerControl(key, new FormControl());
  }

  radioButtonSelection(stepper: MatStepper): void {
    stepper.next();
  }

  showSummary(): void {
    this.userSelectionService.setUserChoice(this._collectSelections());
    this.router.navigate(['/summary']);
  }

  _collectSelections(): UserChoice {
    return {
      tripname: '' + this.tripBasicsGroup.controls.tripNameCtrl.value,
      tripstart: '' + this.tripBasicsGroup.controls.tripStartCtrl.value,
      tripend: '' + this.tripBasicsGroup.controls.tripEndCtrl.value,
      triptype: '' + this.tripTypeGroup.controls.tripTypeCtrl.value,
      accomodation: '' + this.accomodationGroup.controls.accomodationCtrl.value,
      transport: '' + this.transportGroup.controls.transportCtrl.value,
      activities: this._getSelectionsFromCheckboxes(this.activitiesGroup),
      weather: this._getSelectionsFromCheckboxes(this.weatherGroup),
    };
  }

  _getSelectionsFromCheckboxes(formGroup: FormGroup): string[] {
    const controlKeys = Object.keys(formGroup.controls);
    const selectedKeys: string[] = [];
    controlKeys.forEach((key) => {
      const control: FormControl = <FormControl>(
        formGroup.controls[key as keyof {}]
      );
      if (control.value) {
        selectedKeys.push(key);
      }
    });
    return selectedKeys;
  }
}
