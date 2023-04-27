import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/core/store/app.reducer';

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
    private appStore: Store<AppState>,
    public router: Router,
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

}
