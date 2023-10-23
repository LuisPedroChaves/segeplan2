import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { FiltroIdeas, User } from 'src/app/core/models/adicionales';
import { IdeaAlternative } from 'src/app/core/models/alternative';
import { IAlternativeResult } from 'src/app/core/models/informationGeneral/AlternativeResult';
import { IdeaStore } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { READ_RESULT_IDEAS, SET_ALTERNATIVE } from '../../store/actions';
import { OPEN_DRAWER1 } from 'src/app/core/store/actions';

@Component({
  selector: 'app-result-ideas',
  templateUrl: './result-ideas.component.html',
  styleUrls: ['./result-ideas.component.scss']
})
export class ResultIdeasComponent implements OnInit, OnDestroy {

  filtro: FiltroIdeas;
  state = 'CALIFICADA';
  author = 'TODOS';
  number = '';
  unitExecute = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ideaStoreSubscription = new Subscription()
  displayedColumns: string[] = ['alternative', 'codeRegister', 'entity', 'unitExcecution', 'problematic', 'estimatedCost', 'startPreinvertion', 'stage', 'actions'];
  dataSource = new MatTableDataSource<IAlternativeResult>()

  sessionSubscription: Subscription;
  usuario: User;

  constructor(
    private ideaStore: Store<IdeaStore>,
  ) { }

  ngOnInit(): void {

    this.ideaStoreSubscription = this.ideaStore.select('idea')
      .subscribe(state => {
        console.log(state.resultIdeas);
        const arregloSinDuplicados = this.eliminarDuplicados(state.resultIdeas);
        this.dataSource = new MatTableDataSource<IAlternativeResult>(arregloSinDuplicados)
        setTimeout(() => this.dataSource.paginator = this.paginator)
      })

    this.ideaStore.dispatch(READ_RESULT_IDEAS({ filtro: { state: this.state } }))

    this.sessionSubscription = this.ideaStore.select('session').subscribe(session => {
      if (session.session) {
        this.usuario = session.session.usuario;
      }
    });
  }

  ngOnDestroy(): void {
    this.ideaStoreSubscription?.unsubscribe();
    this.sessionSubscription?.unsubscribe();
  }

  openDrawer1(width1: string, component1: string, alternative: any) {
    this.ideaStore.dispatch(SET_ALTERNATIVE({ alternative }))
    this.ideaStore.dispatch(OPEN_DRAWER1({ width1, component1 }))
  }

  eliminarDuplicados(arr: any[]) {
    const uniqueCodes = new Set(); // Usamos un conjunto para realizar un seguimiento de los códigos únicos.
    const result = [];
  
    for (const item of arr) {
      if (!uniqueCodes.has(item.codigo)) {
        result.push(item);
        uniqueCodes.add(item.codigo);
      }
    }
  
    return result;
  }

  sendFilter(): void {

    this.filtro = { state: this.state };

    if (this.number && this.number != '') {
      this.filtro.number = this.number;
    }
    if (this.unitExecute && this.unitExecute != '') {
      this.filtro.executionUnit = this.unitExecute;
    }
    this.ideaStore.dispatch(READ_RESULT_IDEAS({ filtro: this.filtro }))
  }
}
