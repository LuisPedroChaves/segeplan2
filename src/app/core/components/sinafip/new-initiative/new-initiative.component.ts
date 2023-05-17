import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import { MatStepper } from '@angular/material/stepper';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FileInputComponent } from 'ngx-material-file-input';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { SharedModule } from 'src/app/shared/shared.module';
import { InitiativeStore } from 'src/app/modules/sinafip/store/reducers';
import { CLOSE_DRAWER1, CLOSE_DRAWER2, OPEN_DRAWER2, READ_PRODUCTS } from 'src/app/core/store/actions';
import { Activity, Delimit, EstimatedBudget, GeneralStudy, IRequest, Institution, InvestmentProject, ModalityFinancing, PreinvDocument, ProjectFunction, RequiredDocument, StudyDescription } from 'src/app/core/models/sinafip';
import { Departament, IProduct, User } from 'src/app/core/models/adicionales';
import { Denomination } from 'src/app/core/models/alternative';
import { EntityStore } from 'src/app/modules/sinafip/store/reducers/entity.reducer';
import { ProjectFunctionStore } from 'src/app/modules/sinafip/store/reducers/projectFunction.reducer';
import { GeneralStudyStore } from 'src/app/modules/sinafip/store/reducers/generalStudy.reducer';
import { PreinvDocumentStore } from 'src/app/modules/sinafip/store/reducers/preinvDocument.reducer';
import { ModalityFinancingStore } from 'src/app/modules/sinafip/store/reducers/modalityFinancing.reducer';
import { GeograficoStore } from 'src/app/modules/idea-bank/store/reducers';
import { DenominationStore } from 'src/app/modules/config/store/reducers';
import { ProductStore } from 'src/app/core/store/reducers';
import { AppState } from 'src/app/core/store/app.reducer';
import { IDelimitPopulation } from 'src/app/core/models/sinafip/delimitPopulation';
import { CREATE_INITIATIVE, DELETE_ACTIVITIES, READ_GENERALSTUDIES, READ_MODALITYFINANCINGS, READ_PREINVDOCUMENTS, READ_PROJECTFUNCTIONS, REMOVE_ACTIVITY, SET_ACTIVITIES, SET_ACTIVITY } from 'src/app/modules/sinafip/store/actions';
import { READ_GEOGRAFICOS } from 'src/app/modules/idea-bank/store/actions';
import { READ_DENOMINATIONS } from 'src/app/modules/config/store/actions';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-new-initiative',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-initiative.component.html',
  styleUrls: ['./new-initiative.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class NewInitiativeComponent implements OnInit, OnDestroy {

  @ViewChild('formDrawer') formDrawer!: MatDrawer;
  @ViewChild('scrollMe') myScrollContainer: ElementRef;
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  @ViewChild('stepper') stepper: MatStepper
  @ViewChild('removableInput') removableInput: FileInputComponent
  @ViewChild('removableInput1') removableInput1: FileInputComponent

  total = 0;

  // listados
  // entities: Entity[] = [];
  // entityStoreSubscription = new Subscription();

  projectFunctions: ProjectFunction[] = [];
  projectFunctionStoreSubscription = new Subscription();

  generalStudies: GeneralStudy[] = [];
  generalStudyStoreSubscription = new Subscription();

  preinvDocuments: PreinvDocument[] = [];
  preinvDocumentStoreSubscription = new Subscription();

  modalityFinancings: ModalityFinancing[] = [];
  modalityFinancingStoreSubscription = new Subscription();

  departamentos: Departament[] = [];
  municipios: Departament[] = [];
  departamentoStoreSubscription = new Subscription();

  // references: ReferencePopulation[] = [];
  // referenceStoreSubscription = new Subscription();

  denominations: Denomination[] = [];
  denominationStoreSubscription = new Subscription();

  products: IProduct[] = [];
  productStoreSubscription = new Subscription();

  // END LISTADOS

  institution = new FormGroup({
    entityName: new FormControl('', Validators.required),
    executionUnit: new FormControl('', Validators.required),
    functionProjName: new FormControl('', Validators.required),
    generalStudy: new FormControl('', Validators.required),
    dcmntPreinvest: new FormControl([], Validators.required),
    documentProject: new FormControl(null, Validators.required),
    responsibleName: new FormControl('', Validators.required),
    contactEmail: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
  })

  investmentProject = new FormGroup({
    coreProblem: new FormControl('', Validators.required),
    _product: new FormControl<string | IProduct>('', Validators.required),
    nameProject: new FormControl('', Validators.required),
    objetiveProject: new FormControl('', Validators.required),
    descAdnJust: new FormControl('', Validators.required),
    infoStudies: new FormControl('', Validators.required),
    estimatedProject: new FormControl('', Validators.required),
  })

  studyDescription = new FormGroup({
    nameStudy: new FormControl('', Validators.required),
    objetiveGeneral: new FormControl('', Validators.required),
    costEstimted: new FormControl<number>(null, Validators.required),
    modalityFinancing: new FormControl('', Validators.required),
  })

  requiredDocument = new FormGroup({
    tdr: new FormControl(null, Validators.required),
  })

  delimit = new FormGroup({
    nameRefPop: new FormControl('', Validators.required),
    denomination: new FormControl('', Validators.required),
    // estimatedBenef: new FormControl(null, [Validators.required, Validators.max(999999999999999)]),
    menBenef: new FormControl(null, [Validators.required, Validators.max(999999999999999)]),
    womenBenef: new FormControl(null, [Validators.required, Validators.max(999999999999999)]),
    departament: new FormControl(''),
    municipality: new FormControl(''),
  })

  totalGender = 0;

  sessionSubscription: Subscription;
  usuario: User;

  activitiesStoreSubscription = new Subscription()
  activities: Activity[] = [];
  displayedColumns = ['dateStart', 'dateEnd', 'activity', 'unitMeasure', 'cant', 'priceU', 'subTotal', 'actions'];
  dataSource = new MatTableDataSource<Activity>([])

  initiative: IRequest = null

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [],
    locale: 'es',
  };
  idEntidad = '';
  entidadName = '';

  constructor(
    public initiativeStore: Store<InitiativeStore>,
    //LISTADOS
    private entityStore: Store<EntityStore>,
    private projectFunctionStore: Store<ProjectFunctionStore>,
    private generalStudyStore: Store<GeneralStudyStore>,
    private preinvDocumentStore: Store<PreinvDocumentStore>,
    private modalityFinancingStore: Store<ModalityFinancingStore>,
    private geograficoStore: Store<GeograficoStore>,
    private denominationStore: Store<DenominationStore>,
    private productStore: Store<ProductStore>,
    public store: Store<AppState>,
    private formBuilder: FormBuilder,

    //END LISTADOS
    private ref: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.delimit.valueChanges.subscribe(values => {
      this.totalGender = values.menBenef + values.womenBenef;
    });
   }

  ngOnInit(): void {

    this.delimit.controls.menBenef.setValue(0)
    this.delimit.controls.womenBenef.setValue(0)

    this.sessionSubscription = this.store.select('session').subscribe(session => {
      this.usuario = session.session.usuario;
      this.idEntidad = session.session.usuario.id_inst.toString()
      this.entidadName = session.session.usuario.name_inst;
    });

    this.activitiesStoreSubscription = this.initiativeStore.select('initiative')
      .subscribe(state => {
        // this.ref.detectChanges()
        // window.dispatchEvent(new Event('resize'));

        this.activities = state.activities
        this.dataSource = new MatTableDataSource<Activity>(this.activities)
        this.total = this.activities.map(item => item.subTotal).reduce((prev, curr) => prev + curr, 0);

        this.calendarOptions.events = this.activities.map(a => {
          return { title: a.activity, start: moment(a.dateStart).format(), end: moment(a.dateEnd).format() }
        })

        const INITIAL_DATE: Activity = this.activities.length > 0 ? this.activities[0] : null

        if (INITIAL_DATE) {
          this.calendarComponent.getApi().changeView('dayGridMonth', moment(INITIAL_DATE.dateStart).format())
        }

        if (!this.initiative && state.initiative) {
          this.setInitiative(state.initiative)
        }

        if (this.initiative && !state.initiative) {
          this.initiative = null
          this.resetForms()
        }
      })

    //LISTADOS
    // this.entityStoreSubscription = this.entityStore.select('entity')
    //   .subscribe(state => {
    //     this.entities = state.entities;
    //   })
    // this.entityStore.dispatch(actions.READ_ENTITIES())

    this.projectFunctionStoreSubscription = this.projectFunctionStore.select('projectFunction')
      .subscribe(state => {
        this.projectFunctions = state.projectFunctions;
      })
    this.projectFunctionStore.dispatch(READ_PROJECTFUNCTIONS())

    this.generalStudyStoreSubscription = this.generalStudyStore.select('generalStudy')
      .subscribe(state => {
        this.generalStudies = state.generalStudies;
      })
    this.generalStudyStore.dispatch(READ_GENERALSTUDIES())

    this.preinvDocumentStoreSubscription = this.preinvDocumentStore.select('preinvDocument')
      .subscribe(state => {
        this.preinvDocuments = state.preinvDocuments;
      })
    this.preinvDocumentStore.dispatch(READ_PREINVDOCUMENTS())

    this.modalityFinancingStoreSubscription = this.modalityFinancingStore.select('modalityFinancing')
      .subscribe(state => {
        this.modalityFinancings = state.modalityFinancings;
      })
    this.modalityFinancingStore.dispatch(READ_MODALITYFINANCINGS())

    this.departamentoStoreSubscription = this.geograficoStore.select('geografico')
      .subscribe(state => {
        this.departamentos = state.geograficos;
      })
    this.geograficoStore.dispatch(READ_GEOGRAFICOS());

    this.denominationStoreSubscription = this.denominationStore.select('denomination')
      .subscribe(state => {
        this.denominations = state.denominations;
      })
    this.denominationStore.dispatch(READ_DENOMINATIONS());

    // this.referenceStoreSubscription = this.referenceStore.select('reference')
    //   .subscribe(state => {
    //     this.references = state.references;
    //   })
    // this.referenceStore.dispatch(actions.READ_REFERENCES())


    this.productStoreSubscription = this.productStore.select('product')
      .subscribe(state => {
        this.products = state.products;
      })

    this.productStore.dispatch(READ_PRODUCTS({ filtro: this.idEntidad }))
    // END LISTADOS

    this.institution.controls.entityName.setValue(this.entidadName)
    this.institution.controls.entityName.disable();

  }

  ngOnDestroy(): void {
    this.activitiesStoreSubscription?.unsubscribe()
    // this.entityStoreSubscription.unsubscribe();
    this.projectFunctionStoreSubscription.unsubscribe();
    this.generalStudyStoreSubscription.unsubscribe();
    this.preinvDocumentStoreSubscription.unsubscribe();
    this.modalityFinancingStoreSubscription.unsubscribe();
    this.departamentoStoreSubscription.unsubscribe();
  }

  // closeDrawer1(): void { this.initiativeStore.dispatch(CLOSE_DRAWER1()) }

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

  //formulario de nueva actividad
  openDrawer2(width2: string, component2: string, activity: Activity) {
    // this.initiativeStore.dispatch(SET_ACTIVITY({activity}))
    this.initiativeStore.dispatch(OPEN_DRAWER2({ width2, component2 }))
  }

  closeDrawer2(): void {
    this.initiativeStore.dispatch(CLOSE_DRAWER2())
  }

  removeActivity(activity: Activity): void {
    this.initiativeStore.dispatch(REMOVE_ACTIVITY({ activity }))
  }

  selecDepartament(): void {
    let dptoSelect = this.delimit.controls['departament'].value;
    let dpto = this.departamentos.find((dto: Departament) => dto.NOMBRE == dptoSelect);
    if (dpto) { this.municipios = dpto.municipios }
  }

  selectedProduct(): string {
    const PRODUCT = this.investmentProject.controls['_product'].value;
    return typeof PRODUCT === 'string' ? '' : PRODUCT?.nombre
  }

  setInitiative(initiative: IRequest): void {
    this.initiative = initiative

    // eliminar que los inputs de archivos sean requeridos cuando se esta editando
    this.institution.controls['documentProject'].setValue('temp')
    this.requiredDocument.controls['tdr'].setValue('temp')

    this.institution.controls['entityName'].setValue(initiative.institution.entityName)
    this.institution.controls['executionUnit'].setValue(initiative.institution.executionUnit)
    this.institution.controls['functionProjName'].setValue(initiative.institution.functionProjName)
    this.institution.controls['generalStudy'].setValue(initiative.institution.generalStudy)
    this.institution.controls['dcmntPreinvest'].setValue(
      this.institution.controls['dcmntPreinvest'].value.map(item => {
        return {
          name: item
        }
      })
      )
    // this.institution.controls['documentProject'].setValue(initiative.institution.documentProject)
    this.institution.controls['responsibleName'].setValue(initiative.institution.responsibleName)
    this.institution.controls['contactEmail'].setValue(initiative.institution.contactEmail)
    this.institution.controls['phoneNumber'].setValue(initiative.institution.phoneNumber)

    this.investmentProject.controls['coreProblem'].setValue(initiative.investment.coreProblem)
    this.investmentProject.controls['nameProject'].setValue(initiative.investment.productName)
    this.investmentProject.controls['objetiveProject'].setValue(initiative.investment.objetiveProject)
    this.investmentProject.controls['descAdnJust'].setValue(initiative.investment.descAdnJust)
    this.investmentProject.controls['infoStudies'].setValue(initiative.investment.infoStudies)
    this.investmentProject.controls['estimatedProject'].setValue(initiative.investment.estimatedProject)

    this.studyDescription.controls['nameStudy'].setValue(initiative.studyDescription.nameStudy)
    this.studyDescription.controls['objetiveGeneral'].setValue(initiative.studyDescription.objetiveGeneral)
    this.studyDescription.controls['costEstimted'].setValue(initiative.studyDescription.costEstimted)
    this.studyDescription.controls['modalityFinancing'].setValue(initiative.studyDescription.modalityFinancing)

    this.delimit.controls['nameRefPop'].setValue(initiative.delimit.nameRefPop)
    this.delimit.controls['denomination'].setValue(initiative.delimit.denomination)
    this.totalGender = parseInt(initiative.delimit.estimatedBenef);
    // this.delimit.controls['estimatedBenef'].setValue(initiative.delimit.estimatedBenef)
    this.delimit.controls['menBenef'].setValue(initiative.delimit.populations[0].total)
    this.delimit.controls['womenBenef'].setValue(initiative.delimit.populations[1].total)
    this.delimit.controls['departament'].setValue(initiative.delimit.departament)
    this.delimit.controls['municipality'].setValue(initiative.delimit.municipality)

    this.initiativeStore.dispatch(SET_ACTIVITIES({ activities: initiative.requirementsDocuments.stimatedBudget.activities }))

    setTimeout(() => {
      this.selecDepartament()

      const PRODUCT = this.products.find(p => +p.codigo === +initiative.investment.productId)
      this.investmentProject.controls['_product'].setValue(PRODUCT)
    }, 1500);
  }

  resetForms(): void {
    this.stepper.reset()
    this.removableInput.clear()
    this.removableInput1.clear()

    this.initiativeStore.dispatch(DELETE_ACTIVITIES())
  }

  saveInitiative(): void {

    const {
      executionUnit,
      functionProjName,
      generalStudy,
      dcmntPreinvest,
      documentProject,
      responsibleName,
      contactEmail,
      phoneNumber,
    } = this.institution.value
    const entityName = this.institution.controls.entityName.value;

    const {
      _product,
      coreProblem,
      nameProject,
      objetiveProject,
      descAdnJust,
      infoStudies,
      estimatedProject,
    } = this.investmentProject.value

    const {
      nameStudy,
      objetiveGeneral,
      costEstimted,
      modalityFinancing,
    } = this.studyDescription.value

    const {
      nameRefPop,
      denomination,
      // estimatedBenef,
      menBenef,
      womenBenef,
      departament,
      municipality
    } = this.delimit.value

    let populations: IDelimitPopulation[] = [
      { type: 'Hombres', total: menBenef },
      { type: 'Mujeres', total: womenBenef },
    ]

    const {
      tdr,
    } = this.requiredDocument.value

    // editar
    if (this.initiative) {

      this.initiative = {
        ...this.initiative,
        institution: {
          ...this.initiative.institution,
          entityName,
          executionUnit,
          functionProjName,
          generalStudy,
          documentsFinance: dcmntPreinvest,
          responsibleName,
          contactEmail,
          phoneNumber,
        },
        investment: {
          ...this.initiative.investment,
          coreProblem,
          productId: typeof _product === 'string' ? null : _product?.codigo,
          productName: typeof _product === 'string' ? null : _product?.nombre,
          nameProject,
          objetiveProject,
          descAdnJust,
          infoStudies,
          estimatedProject,
        },
        studyDescription: {
          ...this.initiative.studyDescription,
          nameStudy,
          objetiveGeneral,
          costEstimted,
          modalityFinancing,
        },
        delimit: {
          ...this.initiative.delimit,
          nameRefPop,
          denomination,
          estimatedBenef: this.totalGender.toString(),
          departament,
          municipality,
          populations
        },
        requirementsDocuments: {
          ...this.initiative.requirementsDocuments,
          stimatedBudget: {
            totalStimated: this.total,
            activities: this.activities
          }
        }
      }


      return
    }

    // nuevo
    const institution: Institution = {
      entityName,
      executionUnit,
      functionProjName,
      generalStudy,
      documentProject: '',
      responsibleName,
      contactEmail,
      phoneNumber,
      documentsFinance: dcmntPreinvest
    }

    const investment: InvestmentProject = {
      coreProblem,
      productId: typeof _product === 'string' ? null : _product?.codigo,
      productName: typeof _product === 'string' ? null : _product?.nombre,
      nameProject,
      objetiveProject,
      descAdnJust,
      infoStudies,
      estimatedProject,
    }

    const studyDescription: StudyDescription = {
      nameStudy,
      objetiveGeneral,
      costEstimted,
      modalityFinancing,
    }

    const delimit: Delimit = {
      nameRefPop,
      denomination,
      estimatedBenef: this.totalGender.toString(),
      departament,
      municipality,
      populations
    }

    const stimatedBudget: EstimatedBudget = {
      totalStimated: this.total,
      activities: this.activities
    }

    const requirementsDocuments: RequiredDocument = {
      tdr: '',
      stimatedBudget
    }

    const NEW_REQUEST: IRequest = {
      institution,
      investment,
      studyDescription,
      delimit,
      requirementsDocuments
    }
    console.log("🚀 ~ file: new-initiative.component.ts:526 ~ NewInitiativeComponent ~ saveInitiative ~ NEW_REQUEST", NEW_REQUEST)

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { title: 'Crear Iniciativa de preinversión', description: '¿Esta seguro que desea guardar los datos para crear una iniciativa?', confirmation: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Code of Work
        this.initiativeStore.dispatch(CREATE_INITIATIVE({
          initiative: NEW_REQUEST,
          payload: {
            documentProject,
            tdr,
          }
        }))
        this.resetForms()
        this.initiativeStore.dispatch(CLOSE_DRAWER1());
        return
      }
      return
    });
  }

}

