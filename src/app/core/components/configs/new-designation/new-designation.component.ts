import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IDenomination } from 'src/app/core/models/configs/denomination';
import { CLOSE_DRAWER1 } from 'src/app/core/store/actions';
import { SharedModule } from 'src/app/shared/shared.module';
import { DenominationStore } from '../../../../modules/config/store/reducers/denomination.reducer';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { CREATE_DENOMINATION, DELETE_DENOMINATION, UPDATE_DENOMINATION } from 'src/app/modules/config/store/actions';

@Component({
  selector: 'app-new-designation',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-designation.component.html',
  styleUrls: ['./new-designation.component.scss']
})
export class NewDesignationComponent implements OnInit, OnDestroy {

  newDenomination = new FormGroup({
    name: new FormControl('', Validators.required),
  })

  denominationSubscription = new Subscription()
  denomination: IDenomination = null!

  editCard1 = false
  elevationCard1 = 'elevation2'

  constructor(
    private denominationStore: Store<DenominationStore>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.denominationSubscription = this.denominationStore.select('denomination')
      .subscribe(state => {
        this.setDenomination(state.denomination)
      })

  }

  ngOnDestroy(): void {
    this.denominationSubscription?.unsubscribe()
  }

  closeDrawer1(): void { this.denominationStore.dispatch(CLOSE_DRAWER1()) }

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

  setDenomination(denomination: IDenomination): void {

    if (denomination) {

      this.denomination = denomination

      this.newDenomination.controls['name'].setValue(denomination.name)
      return
    }

    this.denomination = null!
    this.newDenomination.reset()

  }

  deleteDenomination(): void {

    this.dialog.open(ConfirmationDialogComponent, {
      width: '375px',
      data: {
        title: 'Eliminar denominación',
        description: `¿Seguro que quiere eliminar la denominación ${this.denomination.name}?`,
        confirmation: true
      }
    }).afterClosed().subscribe(result => {

      if (result === true) {

        this.denominationStore.dispatch(DELETE_DENOMINATION({ idDenomination: this.denomination.codigo }))
        this.denominationStore.dispatch(CLOSE_DRAWER1())

      }


    });
  }

  onSubmit(): void {

    if (this.newDenomination.invalid) {
      return
    }

    const {
      name,
    } = this.newDenomination.value

    if (this.denomination) {

      this.denomination = {
        ...this.denomination,
        name,
      }

      this.denominationStore.dispatch(UPDATE_DENOMINATION({ denomination: this.denomination }))
      this.denominationStore.dispatch(CLOSE_DRAWER1())

      return
    }

    const denomination: IDenomination = {
      name,
    }

    this.denominationStore.dispatch(CREATE_DENOMINATION({ denomination }))
    this.denominationStore.dispatch(CLOSE_DRAWER1())

  }
}
