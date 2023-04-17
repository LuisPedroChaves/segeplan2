import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CLOSE_DRAWER1, CLOSE_DRAWER2 } from 'src/app/core/store/actions';
import { AppState } from 'src/app/core/store/app.reducer';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  @ViewChild('drawer1') drawer1!: MatDrawer;
  @ViewChild('drawer2') drawer2!: MatDrawer;
  drawerSubscription = new Subscription()
  component1 = '';
  widthDrawer1 = '90%';
  component2 = '';
  widthDrawer2 = '60%';

  constructor(
    private appStore: Store<AppState>,
    public router: Router,
  ) { }

  ngOnInit(): void {

    this.drawerSubscription = this.appStore.select('drawer')
    .subscribe(state => {

      if (this.drawer1) {
        this.drawer1.opened = state.drawer1
        this.widthDrawer1 = state.width1
        this.component1 = state.component1
      }

      if (this.drawer2) {
        this.drawer2.opened = state.drawer2
        this.widthDrawer2 = state.width2
        this.component2 = state.component2
      }

    })

  }

  ngOnDestroy(): void {

    this.drawerSubscription?.unsubscribe()

  }

  closeDrawer1(): void {

    this.appStore.dispatch(CLOSE_DRAWER1())

  }

  closeDrawer2(): void {

    this.appStore.dispatch(CLOSE_DRAWER2())

  }

}
