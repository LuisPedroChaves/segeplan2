import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { OPEN_DRAWER1 } from 'src/app/core/store/actions';
import { AppState } from 'src/app/core/store/app.reducer';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  constructor(
    public router: Router,
    private appStore: Store<AppState>
  ) { }

  openDrawer1(width1: string, component1: string, product: any): void {
    // this.warehouseStore.dispatch(SET_WAREHOUSE({ warehouse }))
    this.appStore.dispatch(OPEN_DRAWER1({ width1, component1 }))
  }

}
