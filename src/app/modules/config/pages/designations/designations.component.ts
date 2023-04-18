import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { OPEN_DRAWER1 } from 'src/app/core/store/actions';
import { DenominationStore } from '../../store/reducers';
import { READ_DENOMINATIONS, SET_DENOMINATION } from '../../store/actions';
import { IDenomination } from 'src/app/core/models/configs/denomination';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.scss']
})
export class DesignationsComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  denominationSubscription = new Subscription()
  denominations: IDenomination[] = []
  displayedColumns: string[] = ['image', 'name', 'actions'];
  dataSource = new MatTableDataSource<IDenomination>([]);

  constructor(
    private denominationStore: Store<DenominationStore>
  ) { }

  ngOnInit(): void {

    this.denominationSubscription = this.denominationStore.select('denomination')
      .subscribe(state => {

        if (state.denominations.length > 0) {
          this.denominations = state.denominations
          this.dataSource = new MatTableDataSource<IDenomination>(this.denominations)
          setTimeout(() => this.dataSource.paginator = this.paginator);
        }

      })

    this.denominationStore.dispatch(READ_DENOMINATIONS())

  }

  ngOnDestroy(): void {

    this.denominationSubscription?.unsubscribe()

  }

  applyFilter(text: string): void {

    this.dataSource.filter = text

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDrawer1(width1: string, component1: string, denomination: IDenomination): void {
    this.denominationStore.dispatch(SET_DENOMINATION({ denomination }))
    this.denominationStore.dispatch(OPEN_DRAWER1({ width1, component1 }))
  }

}
