import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AdmissionQuanty, IPriorizationMatrix, IRequest } from 'src/app/core/models/sinafip';
import { CLOSE_DRAWER2 } from 'src/app/core/store/actions';
import { AppState } from 'src/app/core/store/app.reducer';
import { SinafipService } from 'src/app/modules/sinafip/services/sinafip.service';
import { InitiativeStore } from 'src/app/modules/sinafip/store/reducers';

import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-admition-matrix',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './admition-matrix.component.html',
  styleUrls: ['./admition-matrix.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ]
})

export class AdmitionMatrixComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [],
    locale: 'es',
  };

  isMatrixPriorization = false;
  matrixPriorization: any = {};
  matrices: any = {};

  valuePlanning = 0;
  totalPriorization = 0;

  initiativeStoreSubscription = new Subscription()
  initiative: IRequest = null;

  admissionResume: AdmissionQuanty;
  priorizationMatrix: IPriorizationMatrix;

  criterio1 = new FormGroup({
    statementNeedValue: new FormControl('', Validators.required),
    statementNeedDescription: new FormControl(''),
  })
  criterio2 = new FormGroup({
    numberBeneficiariesValue: new FormControl('', Validators.required),
    numberBeneficiariesDescription: new FormControl(''),
  })
  criterio3 = new FormGroup({
    objetivesGoalsValue: new FormControl('', Validators.required),
    objetivesGoalsDescription: new FormControl(''),
  })
  criterio4 = new FormGroup({
    tdrValue: new FormControl('', Validators.required),
    tdrDescription: new FormControl(''),
  })
  criterio5 = new FormGroup({
    estimatedCostValue: new FormControl('', Validators.required),
    estimatedCostDescription: new FormControl(''),
  })
  criterio6 = new FormGroup({
    generalScheduleValue: new FormControl('', Validators.required),
    generalScheduleDescription: new FormControl(''),
  })
  // resume = new FormGroup({
  //   descriptionGeneral: new FormControl(''),
  // })

  // admissionValues: IAdmissionConfig = {}
  isLoadingValues = true;

  rating30 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  rating20 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  rating10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // statementMaxValue = []
  // beneficiariestMaxValue = []
  // goalsMaxValue = []
  // tdrMaxValue = []
  // costMaxValue = []
  // scheduleMaxValue = []

  constructor(
    private appStore: Store<AppState>,
    private initiativeStore: Store<InitiativeStore>,
    private sinafipService: SinafipService,
    private dialog: MatDialog,
    private ref: ChangeDetectorRef,

  ) {

  }

  ngOnInit(): void {
    // this.sinafipService.getValuesOfMatrixPertinence().subscribe((res: any) => {
    //   this.admissionValues = res;
    //   this.statementMaxValue = this.getNumberArray(res.statementMaxValue);
    //   this.beneficiariestMaxValue = this.getNumberArray(res.beneficiariestMaxValue);
    //   this.goalsMaxValue = this.getNumberArray(res.goalsMaxValue);
    //   this.tdrMaxValue = this.getNumberArray(res.tdrMaxValue);
    //   this.costMaxValue = this.getNumberArray(res.costMaxValue);
    //   this.scheduleMaxValue = this.getNumberArray(res.scheduleMaxValue);
    //   this.isLoadingValues = false;
    // });

    // this.criterio1;

    // this.initiativeStoreSubscription = this.initiativeStore.select('initiative')
    //   .subscribe(state => {

    //     if (state.initiative) {
    //       this.initiative = state.initiative
    //       console.log(this.initiative)

    //       if (this.initiative?.requirementsDocuments?.stimatedBudget?.activities &&
    //         this.initiative?.requirementsDocuments?.stimatedBudget?.activities.length > 0) {
    //         const ACTIVITIES = this.initiative?.requirementsDocuments?.stimatedBudget?.activities;
    //         this.calendarOptions.events = ACTIVITIES.map(a => {
    //           return { title: a.activity, start: moment(a.dateStart).format(), end: moment(a.dateEnd).format() }
    //         })
    //         this.ref.detectChanges()
    //         window.dispatchEvent(new Event('resize'));
    //       }
    //     }

    //   })
  }

  ngOnDestroy(): void {

  }

  closeDrawer2():void {
    this.initiativeStore.dispatch(CLOSE_DRAWER2())
  }

  // closeFullDrawer(): void {
  //   const dialogRef = this.dialog.open(AlertDialogComponent, {
  //     width: '375px',
  //     data: { title: 'Cambios no guardados', description: '¿Seguro que quiere salir? Hay cambios sin guardar. Si abandona la página, los cambios se perderán.', confirmation: true }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {

  //     if (result === true) {

  //       this.appStore.dispatch(CLOSE_FULL_DRAWER())

  //     }

  //     return
  //   });
  // }

  resumeMatrix(): void {

    const { statementNeedValue, statementNeedDescription } = this.criterio1.value;
    const { numberBeneficiariesValue, numberBeneficiariesDescription } = this.criterio2.value;
    const { objetivesGoalsValue, objetivesGoalsDescription } = this.criterio3.value;
    const { tdrValue, tdrDescription } = this.criterio4.value;
    const { estimatedCostValue, estimatedCostDescription } = this.criterio5.value;
    const { generalScheduleValue, generalScheduleDescription } = this.criterio6.value;

    const statementNeed = this.initiative.investment.coreProblem;
    const numberBeneficiaries = this.initiative.delimit.estimatedBenef;
    const objetivesGoals = this.initiative.studyDescription.objetiveGeneral;
    const tdr = this.initiative.requirementsDocuments.tdr;
    const estimatedCost = this.initiative.requirementsDocuments.stimatedBudget.totalStimated;
    const generalSchedule = this.initiative.requirementsDocuments.scheduleActiv;

    let statementNeedValueInt = parseInt(statementNeedValue);
    let numberBeneficiariesValueInt = parseInt(numberBeneficiariesValue);
    let objetivesGoalsValueInt = parseInt(objetivesGoalsValue);
    let tdrValueInt = parseInt(tdrValue);
    let estimatedCostValueInt = parseInt(estimatedCostValue);
    let generalScheduleValueInt = parseInt(generalScheduleValue);
    let total = statementNeedValueInt + numberBeneficiariesValueInt + objetivesGoalsValueInt + tdrValueInt + estimatedCostValueInt + generalScheduleValueInt;


    this.admissionResume = {
      statementNeed,
      statementNeedDescription,
      statementNeedValue: statementNeedValueInt,
      numberBeneficiaries,
      numberBeneficiariesDescription,
      numberBeneficiariesValue: numberBeneficiariesValueInt,
      objetivesGoals,
      objetivesGoalsDescription,
      objetivesGoalsValue: objetivesGoalsValueInt,
      tdr,
      tdrDescription,
      tdrValue: tdrValueInt,
      estimatedCost: estimatedCost.toString(),
      estimatedCostDescription,
      estimatedCostValue: estimatedCostValueInt,
      generalSchedule,
      generalScheduleDescription,
      generalScheduleValue: generalScheduleValueInt,
      total,
    }

    this.matrices = { admissionQuanty: this.admissionResume }


    if (this.initiative.studyDescription.modalityFinancing == 'NO SE CUENTA CON FUENTE DE FINANCIAMIENTO' && total >= 60) {
      if (this.initiative.investment?.productName) {
        this.valuePlanning = 20;
      }
      let benefValue = this.admissionResume?.numberBeneficiariesValue * 2;


      this.sinafipService.requestPriorizationData(this.initiative.id).subscribe((res: any) => {
        this.matrixPriorization = res;
        this.totalPriorization = this.valuePlanning + this.admissionResume?.objetivesGoalsValue + this.matrixPriorization?.indiceProbreza + this.matrixPriorization?.valueFunctions + benefValue;
        this.priorizationMatrix = {
          value1: this.valuePlanning,
          value2: this.admissionResume?.objetivesGoalsValue,
          value3: benefValue,
          value4: this.matrixPriorization?.indiceProbreza,
          value5: this.matrixPriorization?.valueFunctions,
          total: this.totalPriorization
        }

        this.matrices.priorizationMatrix = this.priorizationMatrix;
      })
      this.isMatrixPriorization = true;


    }
  }

  saveAdmissionMatrix(): void {

    this.sinafipService.saveRequestAdmission(this.initiative.id, this.matrices)
      .subscribe((res: any) => {
        console.log(res);
        this.appStore.dispatch(CLOSE_DRAWER2());
        this.stepper.reset();
      });

  }

  getNumberArray(maxValue: number): number[] {
    const numbersArray: number[] = [];
    for (let i = 0; i <= maxValue; i++) {
      numbersArray.push(i);
    }
    return numbersArray;
  }

}
