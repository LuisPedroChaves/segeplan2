import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CLOSE_DRAWER1 } from 'src/app/core/store/actions';
import { AppState } from 'src/app/core/store/app.reducer';
@Component({
  selector: 'app-new-project-type',
  templateUrl: './new-project-type.component.html',
  styleUrls: ['./new-project-type.component.scss']
})
export class NewProjectTypeComponent {
  editCard1 = false
  elevationCard1 = 'elevation2'

  constructor(
    private appStore: Store<AppState>,
  ) {}

  closeDrawer1(): void { this.appStore.dispatch(CLOSE_DRAWER1()) }

  /* #region elevation style */
  card1Style($event: any): void {

    if (this.editCard1 === true) {
      this.elevationCard1 = 'elevation8'
      return
    }

    this.elevationCard1 = $event.type == 'mouseover' ? 'elevation8' : 'elevation2';
  }

  outCard1(): void {

    this.editCard1 = false
    this.elevationCard1 = 'elevation2'
  }
}
