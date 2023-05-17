import { IRequest } from 'src/app/core/models/sinafip/request';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { User } from 'src/app/core/models/adicionales';
import { InitiativeStore } from '../../store/reducers/initiative.reducer copy';
import { READ_INITIATIVES, UPDATE_INITIATIVE, SET_INITIATIVE } from '../../store/actions/initiative.actions';
import { MatPaginator } from '@angular/material/paginator';
import { OPEN_DRAWER1, CLOSE_DRAWER1 } from 'src/app/core/store/actions/drawer.actions';


@Component({
  selector: 'app-prioritization-matrix',
  templateUrl: './prioritization-matrix.component.html',
  styleUrls: ['./prioritization-matrix.component.scss']
})
export class PrioritizationMatrixComponent implements OnInit, OnDestroy {

  @Input('component') component: string = 'PRIORITIZATION_MATRIX'

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['entity', 'studyName', 'objetive', 'cost', 'asingment', 'priorization', 'state', 'actions'];
  dataSource = new MatTableDataSource<IRequest>();
  initiativeSubscription = new Subscription();
  initiatives: IRequest[] = [];
  sessionSubscription: Subscription;
  usuario: User;


  constructor(
    private initiativeStore: Store<InitiativeStore>
  ){}

  ngOnInit(): void {
    this.sessionSubscription = this.initiativeStore.select('session').subscribe(session => {
      if (session.session) {
        this.usuario = session.session.usuario;
      }
    });

    this.initiativeSubscription = this.initiativeStore.select('initiative')
      .subscribe(state => {

        this.initiatives = state.initiatives
        this.dataSource = new MatTableDataSource<IRequest>(state.initiatives);

      });
        if (this.component === 'PRIORITIZATION_MATRIX') {
          this.initiativeStore.dispatch(READ_INITIATIVES({filtro: {status: 'CALIFICADA', result: 'ADMITIDA'}}))
        }

        setTimeout(() => this.dataSource.paginator = this.paginator)
    }

  ngOnDestroy(): void {
    this.initiativeSubscription?.unsubscribe();
    this.sessionSubscription?.unsubscribe();
  }

  changeStatus(status: string, initiative: IRequest): void {
    console.log(initiative);
    this.initiativeStore.dispatch(UPDATE_INITIATIVE({
      initiative: {
        ...initiative,
        status
      }
    }))
  }

  openDrawer1(width1: string, component1: string, initiative: IRequest) {

    this.initiativeStore.dispatch(SET_INITIATIVE({ initiative }))
    this.initiativeStore.dispatch(OPEN_DRAWER1({ width1, component1 }))
    // this.initiativeStore.dispatch(CLOSE_DRAWER1())
  }
}

