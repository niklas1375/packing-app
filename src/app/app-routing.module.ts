import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackingListComponent } from './components/packing-list/packing-list.component';
import { SummaryComponent } from './components/summary/summary.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { SummaryGuardService } from './guards/summary-guard.service';

const routes: Routes = [
  {
    path: '',
    component: PackingListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'summary',
    component: SummaryComponent,
    canActivate: [SummaryGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
