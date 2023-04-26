import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/adicionales';
import { IdeaAlternative } from 'src/app/core/models/alternative';
import { GeneralInformation } from 'src/app/core/models/informationGeneral';
import { IdeaStore } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { READ_SEND_IDEAS, SET_IDEA } from '../../store/actions';
import { OPEN_DRAWER1 } from 'src/app/core/store/actions';
import { ConvertService } from 'src/app/core/services/convert.service';

@Component({
  selector: 'app-revelance-matrix',
  templateUrl: './revelance-matrix.component.html',
  styleUrls: ['./revelance-matrix.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RevelanceMatrixComponent implements OnInit, OnDestroy {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  ideaStoreSubscription = new Subscription()
  displayedColumns: string[] = ['registerCode', 'generalObjective', 'baseLine', 'nameEntity', 'createdAt', 'result', 'state'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: IdeaAlternative | null;
  dataSource = new MatTableDataSource<GeneralInformation>()

  sessionSubscription: Subscription;
  usuario: User;

  constructor(
    private ideaStore: Store<IdeaStore>,
  ) { }

  ngOnInit(): void {

    this.ideaStoreSubscription = this.ideaStore.select('idea')
      .subscribe(state => {
        this.dataSource = new MatTableDataSource<GeneralInformation>(state.sendIdeas)
        setTimeout(() => this.dataSource.paginator = this.paginator)
      })

    this.ideaStore.dispatch(READ_SEND_IDEAS({ filtro: { state: 'ENVIADA' } }))

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

  openDrawer1(width1: string, component1: string, idea: GeneralInformation) {
    this.ideaStore.dispatch(SET_IDEA({idea}))
    this.ideaStore.dispatch(OPEN_DRAWER1({ width1, component1 }))
  }

  printReport(idea: GeneralInformation, alternative: IdeaAlternative) {
    if (alternative.qualification.result == 'PERTINENTE') {
      if (alternative?.preInvestment?.etapaResultado) {
        let print = ConvertService.createIdeaReportPertinenceAndPreinvestment(idea, alternative);
      } else {
        let printf = ConvertService.createIdeaReportPertinence(idea, alternative);
      }
    }
    else {
      let printf = ConvertService.createIdeaReportPertinence(idea, alternative);
    }

  }
}
