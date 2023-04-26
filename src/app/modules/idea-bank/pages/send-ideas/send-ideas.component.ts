import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { FiltroIdeas, User } from 'src/app/core/models/adicionales';
import { IdeaAlternative } from 'src/app/core/models/alternative';
import { GeneralInformation } from 'src/app/core/models/informationGeneral';
import { IdeaStore } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { READ_SEND_IDEAS, SET_IDEA } from '../../store/actions';
import { OPEN_DRAWER1 } from 'src/app/core/store/actions';
import { ConvertService } from 'src/app/core/services/convert.service';

@Component({
  selector: 'app-send-ideas',
  templateUrl: './send-ideas.component.html',
  styleUrls: ['./send-ideas.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SendIdeasComponent implements OnInit, OnDestroy {

  filtro: FiltroIdeas;
  state = 'ENVIADA';
  author = 'Mis Ideas';
  number = '';
  unitExecute = '';

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

    this.ideaStore.dispatch(READ_SEND_IDEAS({ filtro: { state: this.state } }))

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

  sendFilter(): void {

    this.filtro = { state: this.state };
    if (this.author != 'TODOS') {
      this.filtro.author = this.author;
    }
    if (this.number && this.number != '') {
      this.filtro.number = this.number;
    }
    if (this.unitExecute && this.unitExecute != '') {
      this.filtro.executionUnit = this.unitExecute;
    }
    this.ideaStore.dispatch(READ_SEND_IDEAS({ filtro: this.filtro }))
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
