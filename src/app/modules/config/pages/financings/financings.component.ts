import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IFinancing } from 'src/app/core/models/configs/financing';
import { OPEN_DRAWER1 } from 'src/app/core/store/actions';
import { FinancingStore } from '../../store/reducers';
import { READ_FINANCINGS, SET_FINANCING } from '../../store/actions';

@Component({
  selector: 'app-financings',
  templateUrl: './financings.component.html',
  styleUrls: ['./financings.component.scss']
})
export class FinancingsComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  financingSubscription = new Subscription()
  financings: IFinancing[] = []
  displayedColumns: string[] = ['image', 'name', 'actions'];
  dataSource = new MatTableDataSource<IFinancing>([]);

  constructor(
    private financingStore: Store<FinancingStore>
  ) { }

  ngOnInit(): void {

    this.financingSubscription = this.financingStore.select('financing')
      .subscribe(state => {

        if (state.financings.length > 0) {
          this.financings = state.financings
          this.dataSource = new MatTableDataSource<IFinancing>(this.financings)
          setTimeout(() => this.dataSource.paginator = this.paginator);
        }

      })

    this.financingStore.dispatch(READ_FINANCINGS())

  }

  ngOnDestroy(): void {

    this.financingSubscription?.unsubscribe()

  }

  applyFilter(text: string): void {

    this.dataSource.filter = text

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDrawer1(width1: string, component1: string, financing: IFinancing): void {
    this.financingStore.dispatch(SET_FINANCING({ financing }))
    this.financingStore.dispatch(OPEN_DRAWER1({ width1, component1 }))
  }
}
