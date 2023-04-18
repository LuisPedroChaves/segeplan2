import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IReferencePopulation } from 'src/app/core/models/adicionales';
import { OPEN_DRAWER1 } from 'src/app/core/store/actions';
import { referencePopulationstore } from '../../store/reducers';
import { READ_REFERENCE_POPULATIONS, SET_REFERENCE_POPULATION } from '../../store/actions';
@Component({
  selector: 'app-reference-populations',
  templateUrl: './reference-populations.component.html',
  styleUrls: ['./reference-populations.component.scss']
})
export class ReferencePopulationsComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  referencePopulationSubscription = new Subscription()
  referencePopulations: IReferencePopulation[] = []
  displayedColumns: string[] = ['image', 'name', 'actions'];
  dataSource = new MatTableDataSource<IReferencePopulation>([]);

  constructor(
    private referencePopulationStore: Store<referencePopulationstore>
  ) { }

  ngOnInit(): void {

    this.referencePopulationSubscription = this.referencePopulationStore.select('referencePopulation')
      .subscribe(state => {

        if (state.referencePopulations.length > 0) {
          this.referencePopulations = state.referencePopulations
          this.dataSource = new MatTableDataSource<IReferencePopulation>(this.referencePopulations)
          setTimeout(() => this.dataSource.paginator = this.paginator);
        }

      })

    this.referencePopulationStore.dispatch(READ_REFERENCE_POPULATIONS())

  }

  ngOnDestroy(): void {

    this.referencePopulationSubscription?.unsubscribe()

  }

  applyFilter(text: string): void {

    this.dataSource.filter = text

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDrawer1(width1: string, component1: string, referencePopulation: IReferencePopulation): void {
    this.referencePopulationStore.dispatch(SET_REFERENCE_POPULATION({ referencePopulation }))
    this.referencePopulationStore.dispatch(OPEN_DRAWER1({ width1, component1 }))
  }
}
