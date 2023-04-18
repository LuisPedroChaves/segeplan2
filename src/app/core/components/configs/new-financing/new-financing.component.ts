import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IFinancing } from 'src/app/core/models/configs/financing';
import { CLOSE_DRAWER1 } from 'src/app/core/store/actions';
import { AppState } from 'src/app/core/store/app.reducer';
import { FinancingStore } from 'src/app/modules/config/store/reducers';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { CREATE_FINANCING, DELETE_FINANCING, UPDATE_FINANCING } from 'src/app/modules/config/store/actions';
@Component({
  selector: 'app-new-financing',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-financing.component.html',
  styleUrls: ['./new-financing.component.scss']
})
export class NewFinancingComponent implements OnInit, OnDestroy {

  newFinancing = new FormGroup({
    name: new FormControl('', Validators.required),
  })

  financingSubscription = new Subscription()
  financing: IFinancing = null!

  editCard1 = false
  elevationCard1 = 'elevation2'

  constructor(
    private financingStore: Store<FinancingStore>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.financingSubscription = this.financingStore.select('financing')
      .subscribe(state => {
        this.setFinancing(state.financing)
      })

  }

  ngOnDestroy(): void {
    this.financingSubscription?.unsubscribe()
  }

  closeDrawer1(): void { this.financingStore.dispatch(CLOSE_DRAWER1()) }

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
  /* #endregion */

  setFinancing(financing: IFinancing): void {

    if (financing) {

      this.financing = financing

      this.newFinancing.controls['name'].setValue(financing.name)
      return
    }

    this.financing = null!
    this.newFinancing.reset()

  }

  deleteFinancing(): void {

    this.dialog.open(ConfirmationDialogComponent, {
      width: '375px',
      data: {
        title: 'Eliminar financiamiento',
        description: `¿Seguro que quiere eliminar el financiamiento ${this.financing.name}?`,
        confirmation: true
      }
    }).afterClosed().subscribe(result => {

      if (result === true) {

        this.financingStore.dispatch(DELETE_FINANCING({ idfinancing: this.financing.id }))
        this.financingStore.dispatch(CLOSE_DRAWER1())

      }
    });
  }

  onSubmit(): void {

    if (this.newFinancing.invalid) {
      return
    }

    const {
      name,
    } = this.newFinancing.value

    if (this.financing) {

      this.financing = {
        ...this.financing,
        name,
      }

      this.financingStore.dispatch(UPDATE_FINANCING({ financing: this.financing }))
      this.financingStore.dispatch(CLOSE_DRAWER1())

      return
    }

    const financing: IFinancing = {
      name,
    }

    this.financingStore.dispatch(CREATE_FINANCING({ financing }))
    this.financingStore.dispatch(CLOSE_DRAWER1())

  }
}
