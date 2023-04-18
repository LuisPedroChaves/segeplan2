import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { FiltroIdeas, User } from 'src/app/core/models/adicionales';
import { GeneralInformation } from 'src/app/core/models/informationGeneral';
import { IdeaAlternative } from 'src/app/core/models/alternative';
import { IdeaStore } from '../../store/reducers';
import { READ_IDEAS } from '../../store/actions';
import { ConvertService } from 'src/app/core/services/convert.service';

@Component({
  selector: 'app-new-ideas',
  templateUrl: './new-ideas.component.html',
  styleUrls: ['./new-ideas.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class NewIdeasComponent implements OnInit, OnDestroy {

  filtro: FiltroIdeas;
  state = 'TODAS';
  author = 'TODOS';
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
        this.dataSource = new MatTableDataSource<GeneralInformation>(state.ideas)
        setTimeout(() => this.dataSource.paginator = this.paginator)
      })

    this.ideaStore.dispatch(READ_IDEAS({ filtro: { state: this.state } }))

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
    this.ideaStore.dispatch(READ_IDEAS({ filtro: this.filtro }))
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
