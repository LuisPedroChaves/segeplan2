import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IdeaAlternative } from 'src/app/core/models/alternative';
import { GeneralInformation } from 'src/app/core/models/informationGeneral';
import { IdeaStore } from '../../store/reducers/idea.reducer';
import { SET_IDEA } from '../../store/actions';
import { OPEN_DRAWER1 } from 'src/app/core/store/actions';
import { ConvertService } from 'src/app/core/services/convert.service';
import { User } from 'src/app/core/models/adicionales';
import { ReportIdeaService } from '../../services/report-idea.service';

@Component({
  selector: 'app-idea-table',
  templateUrl: './idea-table.component.html',
  styleUrls: ['./idea-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class IdeaTableComponent implements OnInit, OnDestroy {

  @Input('component') component: string = 'NEW_IDEAS'

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
    private reportIdeaService: ReportIdeaService
  ) { }

  ngOnInit(): void {

    this.sessionSubscription = this.ideaStore.select('session').subscribe(session => {
      if (session.session) {
        this.usuario = session.session.usuario;
      }
    });

    this.ideaStoreSubscription = this.ideaStore.select('idea')
      .subscribe(state => {

        if (this.component === 'NEW_IDEAS') {
          this.dataSource = new MatTableDataSource<GeneralInformation>(state.ideas)
        }

        if (this.component === 'SEND_IDEAS') {
          this.dataSource = new MatTableDataSource<GeneralInformation>(state.sendIdeas)
        }

        if (this.component === 'DONE_IDEAS') {
          this.dataSource = new MatTableDataSource<GeneralInformation>(state.doneIdeas)
        }

        setTimeout(() => this.dataSource.paginator = this.paginator)
      })

  }

  ngOnDestroy(): void {
    this.ideaStoreSubscription?.unsubscribe();
    this.sessionSubscription?.unsubscribe();
  }

  openDrawer1(width1: string, component1: string, idea: GeneralInformation) {
    this.ideaStore.dispatch(SET_IDEA({ idea }))
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

  printIdea(idea: GeneralInformation){
    this.reportIdeaService.reportIdeaPDF(idea).then()
  }

}
