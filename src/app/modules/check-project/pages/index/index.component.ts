import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { OPEN_DRAWER1 } from 'src/app/core/store/actions';
import { AppState } from 'src/app/core/store/app.reducer';
import { CheckProjectStore } from '../../store/reducers/checkProject.reducer';
import { CHANGE_IS_MINISTRY, SET_PROJECT } from '../../store/actions/checkProject.actions';
import { IProject } from 'src/app/core/models/seguimiento';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('menuDrawer') menuDrawer: MatDrawer
  drawerSubscription = new Subscription();
  checkProjectSubscription = new Subscription();
  initMenuDrawer = true
  isMinistry = false


  constructor(
    public router: Router,
    private appStore: Store<AppState>,
    public checkProjectStore: Store<CheckProjectStore>,
  ) { }

  ngOnInit(): void {
    this.drawerSubscription = this.appStore.select('drawer')
      .subscribe(state => {
        this.initMenuDrawer = state.menuDrawer;

        if (this.menuDrawer) {
          this.menuDrawer.opened = state.menuDrawer
        }
      })

    this.checkProjectSubscription = this.checkProjectStore.select('checkProject')
      .subscribe(state => {
      this.isMinistry = state.isMinistry
      })
  }

  ngOnDestroy(): void {
    this.drawerSubscription?.unsubscribe();
    this.checkProjectSubscription?.unsubscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.initMenuDrawer) {
        this.menuDrawer.open()
      }
    }, 100);
  }

  openDrawer1(width1: string, component1: string, checkProject: IProject): void {
    this.appStore.dispatch(SET_PROJECT({ checkProject }))
    this.appStore.dispatch(OPEN_DRAWER1({ width1, component1 }))
  }

  checkIsMinistry(isMinistry: boolean): void {
    this.checkProjectStore.dispatch(CHANGE_IS_MINISTRY({ isMinistry }))
  }

}
