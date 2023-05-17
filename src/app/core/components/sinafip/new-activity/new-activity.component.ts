import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Activity } from 'src/app/core/models/sinafip';
import { CLOSE_DRAWER2 } from 'src/app/core/store/actions';
import { SET_ACTIVITY } from 'src/app/modules/sinafip/store/actions';
import { InitiativeStore } from 'src/app/modules/sinafip/store/reducers';

import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-new-activity',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.scss']
})
export class NewActivityComponent implements OnInit {

  subtotal = 0;
  @Input() priceU: number;

  activity = new FormGroup({
    dateStart: new FormControl(moment(), Validators.required),
    dateEnd: new FormControl(moment(), Validators.required),
    activity: new FormControl('', Validators.required),
    unitMeasure: new FormControl('', Validators.required),
    cant: new FormControl<number>(null, Validators.required),
    priceU: new FormControl<number>(null, Validators.required),
  })

  constructor(
    private initiativeStore: Store<InitiativeStore>
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    const {
      dateStart,
      dateEnd,
      activity,
      unitMeasure,
      cant,
      priceU,
    } = this.activity.value

    const NEW_ACTIVITY: Activity = {
      dateStart,
      dateEnd,
      activity,
      unitMeasure,
      cant,
      priceU,
      subTotal: this.subtotal
    }

    this.initiativeStore.dispatch( SET_ACTIVITY({ activity: NEW_ACTIVITY }) )
    this.activity.reset()
    this.initiativeStore.dispatch( CLOSE_DRAWER2() )

  }

  closeDrawer2():void {
    this.initiativeStore.dispatch(CLOSE_DRAWER2())
  }

  updateSubtotal(event: Number){
    console.log(event)
    const {
      cant,
      priceU,
    } = this.activity.value;

    console.log(cant, priceU, this.subtotal);
    this.subtotal =  cant * priceU;

  }

}
