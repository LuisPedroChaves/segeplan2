
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
import { CLOSE_DRAWER1 } from 'src/app/core/store/actions';
import { AppState } from 'src/app/core/store/app.reducer';
import { SinafipService } from 'src/app/modules/sinafip/services/sinafip.service';
import { InitiativeStore } from 'src/app/modules/sinafip/store/reducers';

import { SharedModule } from 'src/app/shared/shared.module';
import { SnackBarService } from '../../../services/snack-bar.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { IAdmissionConfig } from 'src/app/core/models/sinafip/admissionConfig';

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

  matrixPriorization: any = {};
  matrices: any = {};

  isMatrixPriorization = false;
  valuePlanning = 0;
  totalPriorization = 0;

  initiativeStoreSubscription = new Subscription()
  initiative: IRequest = {
    "investment": {
      "coreProblem": "",
      "productId": "",
      "productName": "",
      "nameProject": "",
      "objetiveProject": "",
      "descAdnJust": "",
      "infoStudies": "",
      "estimatedProject": "",
      "requestId": ""
    },
    "studyDescription": {
      "nameStudy": "",
      "objetiveGeneral": "",
      "costEstimted": 0,
      "modalityFinancing": "",
      "requestId": ""
    },
    "delimit": {
      "denomination": "",
      "departament": "",
      "estimatedBenef": "",
      "municipality": "",
      "nameRefPop": "",
      "populations": [{ "type": "", "total": 0, "delimitId": "" }],
      "requestId": ""
    },
    "requirementsDocuments": {
      "tdr": "",
      "scheduleActiv": "",
      "stimatedBudget": {
        "totalStimated": 0,
        "activities": [{
          "dateStart": "",
          "dateEnd": "",
          "activity": "",
          "unitMeasure": "",
          "cant": 0,
          "priceU": 0,
          "subTotal": 0,
        }]
      },
      "requestId": ""
    },
    institution: undefined
  }

  statementMaxValue: any = []
  beneficiariestMaxValue: any = []
  goalsMaxValue: any = []
  tdrMaxValue: any = []
  costMaxValue: any = []
  scheduleMaxValue: any = []

  admissionResume: AdmissionQuanty;
  priorizationMatrix: IPriorizationMatrix;

  criterios = new FormGroup({
    statementNeedValue: new FormControl('', Validators.required),
    statementNeedDescription: new FormControl(''),
    numberBeneficiariesValue: new FormControl('', Validators.required),
    numberBeneficiariesDescription: new FormControl(''),
    objetivesGoalsValue: new FormControl('', Validators.required),
    objetivesGoalsDescription: new FormControl(''),
    tdrValue: new FormControl('', Validators.required),
    tdrDescription: new FormControl(''),
    estimatedCostValue: new FormControl('', Validators.required),
    estimatedCostDescription: new FormControl(''),
    generalScheduleValue: new FormControl('', Validators.required),
    generalScheduleDescription: new FormControl(''),
  })

  resume = new FormGroup({
    descriptionGeneral: new FormControl(''),
  })

  admissionValues: IAdmissionConfig = {}
  isLoadingValues = true;

  ratingGroups: any = [
    {
      name: 'EXCELENTE',
      ratings: [10]
    },
    {
      name: 'BUENO',
      ratings: [9, 8]
    },
    {
      name: 'ACEPTABLE',
      ratings: [7, 6]
    },
    {
      name: 'DEFICIENTE',
      ratings: [5, 4]
    },
    {
      name: 'REPLANTEAR',
      ratings: [3, 2, 1]
    },
  ]

  constructor(
    private appStore: Store<AppState>,
    private initiativeStore: Store<InitiativeStore>,
    private sinafipService: SinafipService,
    private dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private snackbarService: SnackBarService,
  ) {

  }

  ngOnInit(): void {
    this.sinafipService.getValuesOfMatrixPertinence().subscribe((res: any) => {
      this.admissionValues = res;
      this.statementMaxValue = this.getNumberArray(res.statementMaxValue);
      this.beneficiariestMaxValue = this.getNumberArray(res.beneficiariestMaxValue);
      this.goalsMaxValue = this.getNumberArray(res.goalsMaxValue);
      this.tdrMaxValue = this.getNumberArray(res.tdrMaxValue);
      this.costMaxValue = this.getNumberArray(res.costMaxValue);
      this.scheduleMaxValue = this.getNumberArray(res.scheduleMaxValue);
      this.isLoadingValues = false;
    });

    this.initiativeStoreSubscription = this.initiativeStore.select('initiative')
      .subscribe(state => {

        if (state.initiative) {
          this.initiative = state.initiative

          if (this.initiative?.requirementsDocuments?.stimatedBudget?.activities &&
            this.initiative?.requirementsDocuments?.stimatedBudget?.activities.length > 0) {
            const ACTIVITIES = this.initiative?.requirementsDocuments?.stimatedBudget?.activities;
            this.calendarOptions.events = ACTIVITIES.map(a => {
              return { title: a.activity, start: moment(a.dateStart).format(), end: moment(a.dateEnd).format() }
            })
            this.ref.detectChanges()
            window.dispatchEvent(new Event('resize'));
          }
        }
      })
  }

  ngOnDestroy(): void {
    this.initiativeStoreSubscription?.unsubscribe()
  }

  closeDrawer1(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '375px',
      data: { title: 'Cambios no guardados', description: '¿Seguro que quiere salir? Hay cambios sin guardar. Si abandona la página, los cambios se perderán.', confirmation: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.initiativeStore.dispatch(CLOSE_DRAWER1())
      } return
    });
  }

  loadMatrix(): void {

    const { statementNeedValue, statementNeedDescription } = this.criterios.value;
    const { numberBeneficiariesValue, numberBeneficiariesDescription } = this.criterios.value;
    const { objetivesGoalsValue, objetivesGoalsDescription } = this.criterios.value;
    const { tdrValue, tdrDescription } = this.criterios.value;
    const { estimatedCostValue, estimatedCostDescription } = this.criterios.value;
    const { generalScheduleValue, generalScheduleDescription } = this.criterios.value;

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
        this.appStore.dispatch(CLOSE_DRAWER1());
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

