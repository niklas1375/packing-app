import { Component, OnInit } from '@angular/core';
import { PackingHelperService } from 'src/app/services/packing-helper.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  constructor(private packingHelper: PackingHelperService) {}

  ngOnInit(): void {
    console.dir(history.state.data)
  }
}
