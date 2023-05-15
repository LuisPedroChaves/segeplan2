import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { OPEN_DRAWER1 } from 'src/app/core/store/actions';
import { AppState } from 'src/app/core/store/app.reducer';
import { SET_INITIATIVE } from '../../store/actions';
import { IRequest } from 'src/app/core/models/sinafip';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('menuDrawer') menuDrawer: MatDrawer
  drawerSubscription = new Subscription()
  initMenuDrawer = true

  constructor(
    public router: Router,
    private appStore: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.drawerSubscription = this.appStore.select('drawer')
      .subscribe(state => {
        this.initMenuDrawer = state.menuDrawer

        if (this.menuDrawer) {
          this.menuDrawer.opened = state.menuDrawer
        }

      })
  }

  ngOnDestroy(): void {
    this.drawerSubscription?.unsubscribe()
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      if (this.initMenuDrawer) {
        this.menuDrawer.open()
      }
    }, 100);

  }

  openDrawer1(width1: string, component1: string, initiative: IRequest): void {
    this.appStore.dispatch(SET_INITIATIVE({ initiative }))
    this.appStore.dispatch(OPEN_DRAWER1({ width1, component1 }))
  }

}
