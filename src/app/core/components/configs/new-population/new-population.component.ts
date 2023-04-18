import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IReferencePopulation } from 'src/app/core/models/adicionales';
import { CLOSE_DRAWER1 } from 'src/app/core/store/actions';
import { referencePopulationstore } from 'src/app/modules/config/store/reducers';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { CREATE_REFERENCE_POPULATION, DELETE_REFERENCE_POPULATION, UPDATE_REFERENCE_POPULATION } from '../../../../modules/config/store/actions/reference-population.actions';
@Component({
  selector: 'app-new-population',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-population.component.html',
  styleUrls: ['./new-population.component.scss']
})
export class NewPopulationComponent implements OnInit, OnDestroy {

  newReferencePopulation = new FormGroup({
    name: new FormControl('', Validators.required),
  })

  referencePopulationSubscription = new Subscription()
  referencePopulation: IReferencePopulation = null!

  editCard1 = false
  elevationCard1 = 'elevation2'

  constructor(
    private referencePopulationStore: Store<referencePopulationstore>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

    this.referencePopulationSubscription = this.referencePopulationStore.select('referencePopulation')
      .subscribe(state => {
        this.setReferencePopulation(state.referencePopulation)
      })

  }

  ngOnDestroy(): void {
    this.referencePopulationSubscription?.unsubscribe()
  }

  closeDrawer1(): void { this.referencePopulationStore.dispatch(CLOSE_DRAWER1()) }

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

  setReferencePopulation(referencePopulation: IReferencePopulation): void {

    if (referencePopulation) {

      this.referencePopulation = referencePopulation

      this.newReferencePopulation.controls['name'].setValue(referencePopulation.name)
      return
    }

    this.referencePopulation = null!
    this.newReferencePopulation.reset()

  }

  deleteReferencePopulation(): void {

    this.dialog.open(ConfirmationDialogComponent, {
      width: '375px',
      data: {
        title: 'Eliminar población',
        description: `¿Seguro que quiere eliminar la población ${this.referencePopulation.name}?`,
        confirmation: true
      }
    }).afterClosed().subscribe(result => {

      if (result === true) {

        this.referencePopulationStore.dispatch(DELETE_REFERENCE_POPULATION({ idReferencePopulation: this.referencePopulation.codigo }))
        this.referencePopulationStore.dispatch(CLOSE_DRAWER1())

      }
    });
  }

  onSubmit(): void {

    if (this.newReferencePopulation.invalid) {
      return
    }

    const {
      name,
    } = this.newReferencePopulation.value

    if (this.referencePopulation) {

      this.referencePopulation = {
        ...this.referencePopulation,
        name,
      }

      this.referencePopulationStore.dispatch(UPDATE_REFERENCE_POPULATION({ referencePopulation: this.referencePopulation }))
      this.referencePopulationStore.dispatch(CLOSE_DRAWER1())

      return
    }

    const referencePopulation: IReferencePopulation = {
      name,
    }

    this.referencePopulationStore.dispatch(CREATE_REFERENCE_POPULATION({ referencePopulation: referencePopulation }))
    this.referencePopulationStore.dispatch(CLOSE_DRAWER1())

  }
}
