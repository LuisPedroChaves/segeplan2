import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { User } from 'src/app/core/models/adicionales/user';
import { Activity, IRequest } from 'src/app/core/models/sinafip';
import { CLOSE_DRAWER1, OPEN_DRAWER1, OPEN_DRAWER2 } from 'src/app/core/store/actions';
import { SET_INITIATIVE, UPDATE_INITIATIVE } from '../../../../modules/sinafip/store/actions';

import { AppState } from 'src/app/core/store/app.reducer';
import { SinafipService } from 'src/app/modules/sinafip/services/sinafip.service';
import { InitiativeStore } from 'src/app/modules/sinafip/store/reducers';
import { SharedModule } from 'src/app/shared/shared.module';
import * as moment from 'moment';


@Component({
  selector: 'app-initiative-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './initiative-details.component.html',
  styleUrls: ['./initiative-details.component.scss']
})
export class InitiativeDetailsComponent implements OnInit, OnDestroy {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [],
    locale: 'es',
  };

  initiativeStoreSubscription = new Subscription();
  displayedColumns = ['dateStart', 'dateEnd', 'activity', 'unitMeasure', 'cant', 'priceU', 'subTotal'];
  dataSource = new MatTableDataSource<Activity>([]);
  initiative: IRequest = null;
  sessionSubscription: Subscription;
  usuario: User;


  constructor(
    private initiativeStore: Store<InitiativeStore>,
    private store: Store<AppState>,
    private sinafipService: SinafipService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.sessionSubscription = this.store.select('session').subscribe(session => {
      if (session.session) {
        this.usuario = session.session.usuario;
      }
    });

    this.initiativeStoreSubscription = this.initiativeStore.select('initiative')
      .subscribe(state => {

        console.log(state)
        if (state.initiative) {
          this.initiative = state.initiative
          this.dataSource = new MatTableDataSource<Activity>(this.initiative.requirementsDocuments.stimatedBudget.activities)
          if (this.initiative?.requirementsDocuments?.stimatedBudget?.activities &&
            this.initiative?.requirementsDocuments?.stimatedBudget?.activities.length > 0) {
              const ACTIVITIES = this.initiative?.requirementsDocuments?.stimatedBudget?.activities;
              this.calendarOptions.events = ACTIVITIES.map(a => {
                return { title: a.activity, start: moment(a.dateStart).format(), end: moment(a.dateEnd).format() }
              })
              this.ref.detectChanges()
              window.dispatchEvent(new Event('resize'));
          }
        }
      })
    console.log(this.usuario);
  }

  changeStatus(status: string): void {

    this.store.dispatch(UPDATE_INITIATIVE({
      initiative: {
        ...this.initiative,
        status
      }
    }))
    this.store.dispatch(CLOSE_DRAWER1())
  }

  ngOnDestroy(): void {
    this.initiativeStoreSubscription?.unsubscribe()
    this.sessionSubscription?.unsubscribe()
  }

  closeDrawer1(): void {
    this.initiativeStore.dispatch(CLOSE_DRAWER1())
  }

  openDrawer1(width1: string, component1: string, initiative: IRequest): void {
    this.initiativeStore.dispatch(SET_INITIATIVE({ initiative: initiative ? initiative : null }))
    this.initiativeStore.dispatch(OPEN_DRAWER1({ width1, component1 }))
  }

}
