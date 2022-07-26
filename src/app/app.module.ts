import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PackingListComponent } from './components/packing-list/packing-list.component';
import { SummaryComponent } from './components/summary/summary.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CustomDateAdapter } from './util/custom-date-adapter';

@NgModule({
  declarations: [AppComponent, PackingListComponent, SummaryComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'de-DE',
    },
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
