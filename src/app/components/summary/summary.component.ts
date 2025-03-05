import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

import { PackingHelperService } from 'src/app/services/packing-helper.service';
import { PackingList } from 'src/app/types/packing-list';
import { UserChoice } from 'src/app/types/user-choice';
import { PackingCategory } from 'src/app/types/packing-category';
import { CategoryNode, FlatNode } from 'src/app/types/tree-nodes';
import { UserSelectionService } from 'src/app/services/user-selection.service';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
    standalone: false
})
export class SummaryComponent implements OnInit {
  choices!: UserChoice;
  compiledList$!: Observable<PackingList>;
  categoryArray$!: Observable<PackingCategory[]>;
  submitClicked = false;
  submitDone = false;

  constructor(
    private packingHelper: PackingHelperService,
    private router: Router,
    private userSelectionService: UserSelectionService
  ) {}

  ngOnInit(): void {
    const choicesProbable = this.userSelectionService.getUserChoice();
    if (choicesProbable) {
      this.choices = choicesProbable;
      this.compiledList$ = this.packingHelper.compilePackingList(this.choices);
      this.categoryArray$ = this.compiledList$.pipe(
        map((packinglist: PackingList) => {
          return Object.keys(packinglist).map((key) => {
            return packinglist[key as keyof PackingList];
          });
        })
      );
      this.categoryArray$.subscribe((compiledList) => {
        this.dataSource.data = compiledList;
      });
    } else {
      this.router.navigate(['/']);
      /* this.choices = {
        tripname: 'Zugspitze 2.0',
        tripstart: '2022-08-12T10:00:00.000Z',
        tripend: '2022-08-16T10:00:00.000Z',
        accomodation: 'camping',
        activities: ['climbing', 'hiking'],
        transport: 'car',
        triptype: 'leisure',
        weather: ['sunny'],
      };
      this.compiledList$ = this.packingHelper.compilePackingList(this.choices);
      this.categoryArray$ = this.compiledList$.pipe(
        map((packinglist: PackingList) => {
          return Object.keys(packinglist).map((key) => {
            return packinglist[key as keyof PackingList];
          });
        })
      );
      this.categoryArray$.subscribe((compiledArray: PackingCategory[]) => {
        this.dataSource.data = compiledArray;
      }); */
    }
  }

  submitTasks(event: any): void {
    // disable button
    this.submitClicked = true;
    // send tasks
    this.compiledList$.subscribe((compiledList: PackingList) => {
      this.packingHelper
        .submitTodoistList(
          compiledList,
          this.choices.tripname,
          this.choices.tripstart,
          this.choices.tripend
        )
        .subscribe(() => {
          this.submitDone = true;
        });
    });
  }

  private _transformer = (node: CategoryNode, level: number) => {
    const nodeName =
      !!node.content && node.content.length > 0
        ? node.name + ` (${node.content?.length})`
        : node.name;
    return {
      expandable: !!node.content && node.content.length > 0,
      name: nodeName,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.content
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode) => node.expandable;
}
