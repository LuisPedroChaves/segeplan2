import { Component, OnDestroy, OnInit } from '@angular/core';
import { IReferencePopulation } from 'src/app/core/models/configs/reference-population';
import { Subscription } from 'rxjs';
import { IDenomination } from 'src/app/core/models/configs/denomination';
import { Departament, IObject, Procesos, Process } from 'src/app/core/models/adicionales';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralInformation } from 'src/app/core/models/informationGeneral';
import { DataGeo, IdeaAlternative } from 'src/app/core/models/alternative';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { IdeaStore } from 'src/app/modules/idea-bank/store/reducers';
import { DenominationStore, referencePopulationstore } from 'src/app/modules/config/store/reducers';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-new-alternative',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-alternative.component.html',
  styleUrls: ['./new-alternative.component.scss']
})
// export class NewAlternativeComponent implements OnInit, OnDestroy {
export class NewAlternativeComponent {
openFormDrawer(arg0: string,arg1: string) {
throw new Error('Method not implemented.');
}
removeDataGeo(_t379: any) {
throw new Error('Method not implemented.');
}
calculaCobertura() {
throw new Error('Method not implemented.');
}
//   } = this.executionTime.value
//   const EXECUTION_TIME: ExecutionTime = {
//     tentativeTermMonth,
//     tentativeTermYear,
//     executionDateMonth,
//     executionDateYear,
//     finishDateMonth,
//     finishDateYear,
//     annual: 0
//   }
//   if (this.executionTime.value.annual) {
//     EXECUTION_TIME.annual = 1
//   } else if (!this.executionTime.value.annual) {
//     EXECUTION_TIME.annual = 0
//   }
//   const {
//     projectType,
//     formulationProcess,
//     formulationProcessDescription,
//     descriptionInterventions,
//     complexity,
//     estimatedCost,
//     investmentCost,
//     foundingSourcesName,
//   } = this.projectDescription.value
//   const PROJECT_DESCRIPTION: ProjectDescription = {
//     projectType,
//     formulationProcess,
//     formulationProcessDescription,
//     descriptionInterventions,
//     complexity,
//     estimatedCost,
//     investmentCost,
//     foundingSourcesName,
//     fundingSources: 1,
//     execTime: EXECUTION_TIME
//   }
//   if (tentativeTermYear > executionDateYear && tentativeTermYear > finishDateYear && executionDateYear > finishDateYear) {
//     const dialogRef = this.dialog.open(AlertDialogComponent, {
//       width: '250px',
//       data: { title: 'Error al seleccionar Fechas', description: 'Verifique que las fechas seleccionadas cumplan con un periodo de trabajo real.' }
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed', result);
//     });
//     return;
//   }
//   let alternatives: IdeaAlternative[] = this.currentIdea.alternatives ? [...this.currentIdea.alternatives] : [];
//   // editar
//   if (this.currentAlternative) {
//     this.currentAlternative = {
//       ...this.currentAlternative,
//       preName: PRELIMINAR_NAME,
//       resEntity: RESPONSIBLE_ENTITY,
//       popDelimit: POPULATION_DELIMITATION,
//       geoArea: GEOGRAPHIC_AREA,
//       projDesc: PROJECT_DESCRIPTION
//     }
//     const dialogRef = this.dialog.open(AlertDialogComponent, {
//       width: '250px',
//       data: { title: 'Editar Alternativa', description: '¿Esta Seguro que desea guardar los datos de la Alternativa?', confirmation: true }
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed', result);
//       if (result === true) {
//         // Code of Work
//         this.generalInformationService.updateAlternative(this.currentAlternative).subscribe(alternative => {
//           alternatives = alternatives.map(a => {
//             if (a.codigo === this.currentAlternative.codigo) {
//               return {
//                 ...alternative
//               }
//             }
//             return {
//               ...a
//             }
//           })
//           this.ideaStore.dispatch(SET_IDEA_ALTERNATIVES({ alternatives }))
//           this.ideaStore.dispatch(CLOSE_FULL_DRAWER2())
//           this.stepper.reset();
//         });
//       }
//       else {
//         return;
//       }
//     });
//     return
//   }
//   if (this.currentIdea.codigo) {
//     const NEW_ALTERNATIVE: IdeaAlternative = {
//       sectionBIId: this.currentIdea.codigo,
//       preName: PRELIMINAR_NAME,
//       resEntity: RESPONSIBLE_ENTITY,
//       popDelimit: POPULATION_DELIMITATION,
//       geoArea: GEOGRAPHIC_AREA,
//       projDesc: PROJECT_DESCRIPTION
//     }
//     console.log("🚀 ~ file: new-alternative.component.ts:581 ~ NewAlternativeComponent ~ saveIdeaAlternative ~ NEW_ALTERNATIVE:", NEW_ALTERNATIVE)
//     const dialogRef = this.dialog.open(AlertDialogComponent, {
//       width: '250px',
//       data: { title: 'Crear Alternativa', description: '¿Esta Seguro que desea guardar los datos de la Alternativa?', confirmation: true }
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed', result);
//       if (result === true) {
//         // Code of Work
//         this.generalInformationService.sendAlternative(NEW_ALTERNATIVE).subscribe(alternative => {
//           alternatives.push(alternative)
//           this.ideaStore.dispatch(SET_IDEA_ALTERNATIVES({ alternatives }))
//           this.ideaStore.dispatch(CLOSE_FULL_DRAWER2())
//           this.stepper.reset();
//         });
//       }
//       return;
//     });
//     return
//   }
//   // Esto aplica solo cuando se esta creado una idea con sus alternativas al mismo timepo
//   const NEW_ALTERNATIVE: IdeaAlternative = {
//     sectionBIId: '',
//     preName: PRELIMINAR_NAME,
//     resEntity: RESPONSIBLE_ENTITY,
//     popDelimit: POPULATION_DELIMITATION,
//     geoArea: GEOGRAPHIC_AREA,
//     projDesc: PROJECT_DESCRIPTION
//   }
//   const dialogRef = this.dialog.open(AlertDialogComponent, {
//     width: '250px',
//     data: { title: 'Crear Alternativa', description: '¿Esta Seguro que desea guardar los datos de la Alternativa?', confirmation: true }
//   });
//   dialogRef.afterClosed().subscribe(result => {
//     console.log('The dialog was closed', result);
//     if (result === true) {
//       // Code of Work
//       alternatives.push(NEW_ALTERNATIVE)
//       this.stepper.reset();
//       this.ideaStore.dispatch(SET_IDEA_ALTERNATIVES({ alternatives }))
//       this.alternativeStore.dispatch(DELETE_DATA_GEOS())
//       this.ideaStore.dispatch(CLOSE_FULL_DRAWER2())
//     }
//     else {
//       return;
//     }
//   });
// }
// calculaCobertura(): void {
//   if (this.populationDelimitation.value.estimateBeneficiaries) {
//     let estBenefic = this.populationDelimitation.value.estimateBeneficiaries;
//     let tpop = this.totalGender;
//     let multCov = (estBenefic / tpop);
//     let resCov = (multCov * 100);
//     this.coverageText = resCov.toFixed(2);
//   }
// }
scrollToTop() {
throw new Error('Method not implemented.');
}
selecDepartament() {
throw new Error('Method not implemented.');
}
enableTypeProject() {
throw new Error('Method not implemented.');
}

  coverageText = '0'

  /* #region  formularios */
  preliminaryName = new FormGroup({
    typeProject: new FormControl('Forma Capital Fijo', Validators.required),
    proccess: new FormControl(''),
    object: new FormControl(''),
    departament: new FormControl(''),
    municipality: new FormControl(''),
    village: new FormControl(''),
  })

  responsibleEntity = new FormGroup({
    nameEPI: new FormControl('', Validators.required),
    executionUnit: new FormControl('', Validators.required),
    leaderName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  })

  populationDelimitation = new FormGroup({
    referencePopulation: new FormControl(null, Validators.required),
    denomination: new FormControl(''),
    menQty: new FormControl<number>(null, [Validators.required, Validators.max(999999999999999)]),
    womenQty: new FormControl<number>(null, [Validators.required, Validators.max(999999999999999)]),
    // totalPopulation: new FormControl<number>(null, [Validators.required, Validators.max(999999999999999)]),
    // gender: new FormControl('', Validators.required),
    estimateBeneficiaries: new FormControl<number>(null, [Validators.required, Validators.max(999999999999999)]),
    preliminaryCharacterization: new FormControl('', [Validators.required, Validators.maxLength(500)]),
  })

  geographicArea = new FormGroup({
    oneAvailableTerrain: new FormControl(false),
    availableTerrain: new FormControl(false),
    investPurchase: new FormControl(false),
  })

  projectDescription = new FormGroup({
    projectType: new FormControl(null, Validators.required),
    // Este campo solo sirve para habilitar proceso de formulación
    // No se almacena en la DB
    withFormulationProcess: new FormControl(false),
    formulationProcess: new FormControl({ value: null, disabled: true }),
    formulationProcessDescription: new FormControl({ value: null, disabled: true }, [Validators.maxLength(200)]),
    descriptionInterventions: new FormControl('', [Validators.required, Validators.maxLength(250)]),
    complexity: new FormControl('', Validators.required),
    estimatedCost: new FormControl<number>(null, Validators.required),
    investmentCost: new FormControl<number>(null, Validators.required),
    foundingSourcesName: new FormControl(null, Validators.required),
  })

  executionTime = new FormGroup({
    tentativeTermMonth: new FormControl('', Validators.required),
    tentativeTermYear: new FormControl('', Validators.required),
    executionDateMonth: new FormControl('', Validators.required),
    executionDateYear: new FormControl('', Validators.required),
    finishDateMonth: new FormControl('', Validators.required),
    finishDateYear: new FormControl('', Validators.required),
    annual: new FormControl(true, Validators.required),
  })
  /* #endregion */

  /* #region catálogos */
  references: IReferencePopulation[] = [];
  referenceStoreSubscription = new Subscription();

  denominations: IDenomination[] = [];
  denominationStoreSubscription = new Subscription();

  departamentos: Departament[] = [];
  municipios: Departament[] = [];
  departamentoStoreSubscription = new Subscription();

  objetos: IObject[] = [];
  objetoStoreSubscription = new Subscription();

  processes: Procesos = { noFormaCapital: [], formaCapital: [] };
  processStoreSubscription = new Subscription();

  dataSourceProcesos: Process[] = [];
  /* #endregion */

  ideaStoreSubscription = new Subscription();
  currentIdea: GeneralInformation = null;

  alternativeStoreSubscription = new Subscription()
  currentAlternative: IdeaAlternative

  dataGeos: DataGeo[] = [];
  displayedColumns = ['statusDescribe', 'actions'];
  dataSource = new MatTableDataSource<DataGeo>([])

  totalGender = 0;

  constructor(
    private ideaStore: Store<IdeaStore>,
    private referencePopulationStore: Store<referencePopulationstore>,
    private denominationStore: Store<DenominationStore>,
    // private geograficoStore: Store<GeograficoStore>,
    // private objectStore: Store<ObjectStore>,
    // private procesoStore: Store<ProcesoStore>,
    // private generalInformationService: GeneralInformationService,
    // public store: Store<AppState>,
    // public alternativeStore: Store<AlternativeStore>,
    // public dialog: MatDialog,

  ) {

    this.populationDelimitation.valueChanges.subscribe(values => {
      this.totalGender = values.menQty + values.womenQty;
    });
  }

  // ngOnInit(): void {

  //   // Disable input control name Epi
  //   this.responsibleEntity.controls.nameEPI.disable();
  //   // this.populationDelimitation.controls.totalPopulation.disable();
  //   // this.populationDelimitation.controls.totalPopulation.setValue(0)
  //   this.populationDelimitation.controls.menQty.setValue(0)
  //   this.populationDelimitation.controls.womenQty.setValue(0)

  //   this.sessionSubscription = this.store.select('session').subscribe(session => {
  //     this.usuario = session.session.usuario;
  //     if (!this.currentAlternative) {
  //       this.responsibleEntity.controls['nameEPI'].setValue(this.usuario?.name_inst)
  //     }
  //   });

  //   this.alternativeStoreSubscription = this.alternativeStore.select('alternative')
  //     .subscribe(state => {

  //       if (state.alternative) {
  //         this.currentAlternative = state.alternative
  //         this.setEditValues()
  //       } else {

  //         if (this.currentAlternative) {
  //           this.currentAlternative = null
  //           this.stepper ? this.stepper.reset() : null
  //         }

  //       }

  //       this.dataGeos = state.dataGeos
  //       this.dataSource = new MatTableDataSource<DataGeo>(this.dataGeos)
  //     })

  //   //#region Catalogos
  //   this.denominationStoreSubscription = this.denominationStore.select('denomination')
  //     .subscribe(state => {
  //       this.denominations = state.denominations;
  //     })

  //   this.denominationStore.dispatch(READ_DENOMINATIONS())

  //   this.departamentoStoreSubscription = this.geograficoStore.select('geografico')
  //     .subscribe(state => {
  //       this.departamentos = state.geograficos;
  //     })

  //   this.geograficoStore.dispatch(READ_GEOGRAFICOS())


  //   this.objetoStoreSubscription = this.objectStore.select('object')
  //     .subscribe(state => {
  //       this.objetos = state.objects;
  //     })

  //   this.objectStore.dispatch(READ_OBJECTS())

  //   this.processStoreSubscription = this.procesoStore.select('proceso')
  //     .subscribe(state => {
  //       this.processes = state.procesos;
  //       this.dataSourceProcesos = this.processes.formaCapital;

  //     })

  //   this.procesoStore.dispatch(READ_PROCESOS())


  //   this.referenceStoreSubscription = this.referenceStore.select('reference')
  //     .subscribe(state => {
  //       this.references = state.references;
  //     })

  //   this.referenceStore.dispatch(READ_REFERENCES())

  //   //#endregion

  //   this.ideaStoreSubscription = this.ideaStore.select('idea')
  //     .subscribe(state => {
  //       this.currentIdea = state.idea;
  //     })

  //   this.terrainValidators()

  //   this.projectDescription.controls['withFormulationProcess'].valueChanges
  //     .pipe(
  //       distinctUntilChanged()
  //     )
  //     .subscribe(value => {
  //       if (value) {
  //         this.projectDescription.controls['formulationProcess'].enable()
  //         this.projectDescription.controls['formulationProcessDescription'].enable()
  //         return
  //       }

  //       this.projectDescription.controls['formulationProcess'].disable()
  //       this.projectDescription.controls['formulationProcessDescription'].disable()
  //     });
  // }

  // ngOnDestroy(): void {
  //   this.sessionSubscription?.unsubscribe()
  //   this.referenceStoreSubscription?.unsubscribe()
  //   this.denominationStoreSubscription?.unsubscribe()
  //   this.departamentoStoreSubscription?.unsubscribe()
  //   this.objetoStoreSubscription?.unsubscribe()
  //   this.processStoreSubscription?.unsubscribe()

  //   this.ideaStoreSubscription?.unsubscribe()
  //   this.alternativeStoreSubscription?.unsubscribe()
  // }

  // openFormDrawer(formTitle: string, formComponent: string): void {
  //   this.ideaStore.dispatch(OPEN_FORM_DRAWER({ formTitle, formComponent }))
  // }

  // terrainValidators(): void {
  //   this.geographicArea.controls['oneAvailableTerrain'].valueChanges
  //     .pipe(
  //       distinctUntilChanged()
  //     )
  //     .subscribe(value => {
  //       if (value) {
  //         this.geographicArea.controls['availableTerrain'].disable()
  //         this.geographicArea.controls['investPurchase'].disable()
  //         return
  //       }

  //       this.geographicArea.controls['availableTerrain'].enable()
  //       this.geographicArea.controls['investPurchase'].enable()
  //     });
  //   this.geographicArea.controls['availableTerrain'].valueChanges
  //     .pipe(
  //       distinctUntilChanged()
  //     )
  //     .subscribe(value => {
  //       if (value) {
  //         this.geographicArea.controls['oneAvailableTerrain'].disable()
  //         this.geographicArea.controls['investPurchase'].disable()
  //         return
  //       }

  //       this.geographicArea.controls['oneAvailableTerrain'].enable()
  //       this.geographicArea.controls['investPurchase'].enable()
  //     });
  //   this.geographicArea.controls['investPurchase'].valueChanges
  //     .pipe(
  //       distinctUntilChanged()
  //     )
  //     .subscribe(value => {
  //       if (value) {
  //         this.geographicArea.controls['oneAvailableTerrain'].disable()
  //         this.geographicArea.controls['availableTerrain'].disable()
  //         return
  //       }

  //       this.geographicArea.controls['oneAvailableTerrain'].enable()
  //       this.geographicArea.controls['availableTerrain'].enable()
  //     });
  // }

  // selecDepartament(): void {
  //   let dptoSelect = this.preliminaryName.controls['departament'].value;
  //   let dpto = this.departamentos.find((dto: Departament) => dto.NOMBRE == dptoSelect);
  //   if (dpto) { this.municipios = dpto.municipios }
  // }

  // enableTypeProject(): void {
  //   const TYPE = this.preliminaryName.controls['typeProject'].value

  //   if (TYPE === 'Forma Capital Fijo') {
  //     this.dataSourceProcesos = this.processes.formaCapital
  //     // this.preliminaryName.controls['proccess'].enable()
  //     // this.preliminaryName.controls['object'].enable()
  //     // this.preliminaryName.controls['departament'].enable()
  //     // this.preliminaryName.controls['municipality'].enable()
  //     this.preliminaryName.controls['village'].enable()
  //     return
  //   }

  //   this.preliminaryName.controls['proccess'].setValue(null)
  //   this.dataSourceProcesos = this.processes.noFormaCapital
  //   // this.preliminaryName.controls['proccess'].disable()
  //   this.preliminaryName.controls['object'].setValue(null)
  //   // this.preliminaryName.controls['object'].disable()
  //   this.preliminaryName.controls['departament'].setValue(null)
  //   // this.preliminaryName.controls['departament'].disable()
  //   this.preliminaryName.controls['municipality'].setValue(null)
  //   // this.preliminaryName.controls['municipality'].disable()
  //   this.preliminaryName.controls['village'].setValue(null)
  //   this.preliminaryName.controls['village'].disable()
  // }

  // scrollToTop(): void {
  //   setTimeout(() => {
  //     this.myScrollContainer.nativeElement.scrollTop = 0;
  //   }, 500);
  // }

  // removeDataGeo(index: number): void {
  //   this.alternativeStore.dispatch(REMOVE_DATA_GEO({ index }))
  // }

  // setEditValues(): void {

  //   this.preliminaryName.controls['typeProject'].setValue(this.currentAlternative.preName.typeProject)
  //   this.preliminaryName.controls['proccess'].setValue(this.currentAlternative.preName.proccess)
  //   this.preliminaryName.controls['object'].setValue(this.currentAlternative.preName.object)
  //   this.preliminaryName.controls['departament'].setValue(this.currentAlternative.preName.departament)
  //   this.preliminaryName.controls['municipality'].setValue(this.currentAlternative.preName.municipality)
  //   this.preliminaryName.controls['village'].setValue(this.currentAlternative.preName.village)

  //   this.responsibleEntity.controls['nameEPI'].setValue(this.currentAlternative.resEntity.nameEPI)
  //   this.responsibleEntity.controls['executionUnit'].setValue(this.currentAlternative.resEntity.executionUnit)
  //   this.responsibleEntity.controls['leaderName'].setValue(this.currentAlternative.resEntity.leaderName)
  //   this.responsibleEntity.controls['email'].setValue(this.currentAlternative.resEntity.email)
  //   this.responsibleEntity.controls['phone'].setValue(this.currentAlternative.resEntity.phone)

  //   this.populationDelimitation.controls['referencePopulation'].setValue(this.currentAlternative.popDelimit.refPop.name)
  //   this.populationDelimitation.controls['denomination'].setValue(this.currentAlternative.popDelimitdenmtion.name)
  //   this.populationDelimitation.controls['menQty'].setValue(this.currentAlternative.popDelimit.populations[0].total)
  //   this.populationDelimitation.controls['womenQty'].setValue(this.currentAlternative.popDelimit.populations[1].total)
  //   this.totalGender = this.currentAlternative.popDelimit.totalPopulation;
  //   this.coverageText = this.currentAlternative.popDelimit.coverage.toString();
  //   // this.populationDelimitation.controls['gender'].setValue(this.currentAlternative.popDelimit.gender)
  //   this.populationDelimitation.controls['estimateBeneficiaries'].setValue(this.currentAlternative.popDelimit.estimateBeneficiaries)
  //   this.populationDelimitation.controls['preliminaryCharacterization'].setValue(this.currentAlternative.popDelimit.preliminaryCharacterization)

  //   this.geographicArea.controls['oneAvailableTerrain'].setValue(this.currentAlternative.geoArea.oneAvailableTerrain)
  //   this.geographicArea.controls['availableTerrain'].setValue(this.currentAlternative.geoArea.availableTerrain)
  //   this.geographicArea.controls['investPurchase'].setValue(this.currentAlternative.geoArea.investPurchase)

  //   this.projectDescription.controls['projectType'].setValue(this.currentAlternative.projDesc.projectType)
  //   this.projectDescription.controls['formulationProcess'].setValue(this.currentAlternative.projDesc.formulationProcess)
  //   this.projectDescription.controls['formulationProcessDescription'].setValue(this.currentAlternative.projDesc.formulationProcessDescription)
  //   this.projectDescription.controls['descriptionInterventions'].setValue(this.currentAlternative.projDesc.descriptionInterventions)
  //   this.projectDescription.controls['complexity'].setValue(this.currentAlternative.projDesc.complexity)
  //   this.projectDescription.controls['estimatedCost'].setValue(this.currentAlternative.projDesc.estimatedCost)
  //   this.projectDescription.controls['investmentCost'].setValue(this.currentAlternative.projDesc.investmentCost)
  //   this.projectDescription.controls['foundingSourcesName'].setValue(this.currentAlternative.projDesc.foundingSourcesName)

  //   this.executionTime.controls['tentativeTermMonth'].setValue(this.currentAlternative.projDesc.execTime.tentativeTermMonth)
  //   this.executionTime.controls['tentativeTermYear'].setValue(this.currentAlternative.projDesc.execTime.tentativeTermYear)
  //   this.executionTime.controls['executionDateMonth'].setValue(this.currentAlternative.projDesc.execTime.executionDateMonth)
  //   this.executionTime.controls['executionDateYear'].setValue(this.currentAlternative.projDesc.execTime.executionDateYear)
  //   this.executionTime.controls['finishDateMonth'].setValue(this.currentAlternative.projDesc.execTime.finishDateMonth)
  //   this.executionTime.controls['finishDateYear'].setValue(this.currentAlternative.projDesc.execTime.finishDateYear)
  //   this.executionTime.controls['annual'].setValue(Boolean(this.currentAlternative.projDesc.execTime.annual))

  //   setTimeout(() => {

  //     this.selecDepartament()

  //   }, 500);
  // }

  // saveIdeaAlternative(): void {

  //   const {
  //     typeProject,
  //     proccess,
  //     object,
  //     departament,
  //     municipality,
  //     village,
  //   } = this.preliminaryName.value

  //   const PRELIMINAR_NAME: PreliminaryName = {
  //     typeProject,
  //     proccess,
  //     object,
  //     departament,
  //     municipality,
  //     village,
  //     preliminaryName: `${proccess}, ${object}, ${municipality}, ${departament}`
  //   }

  //   const {
  //     nameEPI,
  //     executionUnit,
  //     leaderName,
  //     email,
  //     phone,
  //   } = this.responsibleEntity.value

  //   const RESPONSIBLE_ENTITY: ResponsibleEntity = {
  //     nameEPI: this.usuario?.name_inst,
  //     executionUnit,
  //     leaderName,
  //     email,
  //     phone,
  //   }
  //   console.log("🚀 ~ file: new-alternative.component.ts:418 ~ NewAlternativeComponent ~ saveIdeaAlternative ~ RESPONSIBLE_ENTITY:", RESPONSIBLE_ENTITY)

  //   const {
  //     referencePopulation,
  //     denomination,
  //     menQty,
  //     womenQty,
  //     // totalPopulation,
  //     // gender,
  //     estimateBeneficiaries,
  //     preliminaryCharacterization,
  //   } = this.populationDelimitation.value

  //   let populations: IPopulationAlt[] = [
  //     { type: 'Hombres', total: menQty },
  //     { type: 'Mujeres', total: womenQty },
  //   ]

  //   const POPULATION_DELIMITATION: PopulationDelimitation = {
  //     refPopId: referencePopulation,
  //     denId: denomination,
  //     totalPopulation: this.totalGender,
  //     // gender,
  //     estimateBeneficiaries,
  //     preliminaryCharacterization,
  //     populations
  //   }

  //   const {
  //     availableTerrain,
  //     oneAvailableTerrain,
  //     investPurchase,
  //   } = this.geographicArea.value

  //   const GEOGRAPHIC_AREA: GeographicArea = {
  //     availableTerrain,
  //     oneAvailableTerrain,
  //     investPurchase,
  //     dataGeo: this.dataGeos
  //   }

  //   const {
  //     tentativeTermMonth,
  //     tentativeTermYear,
  //     executionDateMonth,
  //     executionDateYear,
  //     finishDateMonth,
  //     finishDateYear,
  //     annual
  //   } = this.executionTime.value

  //   const EXECUTION_TIME: ExecutionTime = {
  //     tentativeTermMonth,
  //     tentativeTermYear,
  //     executionDateMonth,
  //     executionDateYear,
  //     finishDateMonth,
  //     finishDateYear,
  //     annual: 0
  //   }

  //   if (this.executionTime.value.annual) {
  //     EXECUTION_TIME.annual = 1
  //   } else if (!this.executionTime.value.annual) {
  //     EXECUTION_TIME.annual = 0
  //   }

  //   const {
  //     projectType,
  //     formulationProcess,
  //     formulationProcessDescription,
  //     descriptionInterventions,
  //     complexity,
  //     estimatedCost,
  //     investmentCost,
  //     foundingSourcesName,
  //   } = this.projectDescription.value

  //   const PROJECT_DESCRIPTION: ProjectDescription = {
  //     projectType,
  //     formulationProcess,
  //     formulationProcessDescription,
  //     descriptionInterventions,
  //     complexity,
  //     estimatedCost,
  //     investmentCost,
  //     foundingSourcesName,
  //     fundingSources: 1,
  //     execTime: EXECUTION_TIME
  //   }

  //   if (tentativeTermYear > executionDateYear && tentativeTermYear > finishDateYear && executionDateYear > finishDateYear) {
  //     const dialogRef = this.dialog.open(AlertDialogComponent, {
  //       width: '250px',
  //       data: { title: 'Error al seleccionar Fechas', description: 'Verifique que las fechas seleccionadas cumplan con un periodo de trabajo real.' }
  //     });

  //     dialogRef.afterClosed().subscribe(result => {
  //       console.log('The dialog was closed', result);
  //     });
  //     return;
  //   }

  //   let alternatives: IdeaAlternative[] = this.currentIdea.alternatives ? [...this.currentIdea.alternatives] : [];

  //   // editar
  //   if (this.currentAlternative) {

  //     this.currentAlternative = {
  //       ...this.currentAlternative,
  //       preName: PRELIMINAR_NAME,
  //       resEntity: RESPONSIBLE_ENTITY,
  //       popDelimit: POPULATION_DELIMITATION,
  //       geoArea: GEOGRAPHIC_AREA,
  //       projDesc: PROJECT_DESCRIPTION
  //     }

  //     const dialogRef = this.dialog.open(AlertDialogComponent, {
  //       width: '250px',
  //       data: { title: 'Editar Alternativa', description: '¿Esta Seguro que desea guardar los datos de la Alternativa?', confirmation: true }
  //     });

  //     dialogRef.afterClosed().subscribe(result => {
  //       console.log('The dialog was closed', result);
  //       if (result === true) {
  //         // Code of Work

  //         this.generalInformationService.updateAlternative(this.currentAlternative).subscribe(alternative => {

  //           alternatives = alternatives.map(a => {

  //             if (a.codigo === this.currentAlternative.codigo) {
  //               return {
  //                 ...alternative
  //               }
  //             }

  //             return {
  //               ...a
  //             }


  //           })
  //           this.ideaStore.dispatch(SET_IDEA_ALTERNATIVES({ alternatives }))
  //           this.ideaStore.dispatch(CLOSE_FULL_DRAWER2())
  //           this.stepper.reset();
  //         });
  //       }
  //       else {
  //         return;
  //       }
  //     });

  //     return
  //   }

  //   if (this.currentIdea.codigo) {
  //     const NEW_ALTERNATIVE: IdeaAlternative = {
  //       sectionBIId: this.currentIdea.codigo,
  //       preName: PRELIMINAR_NAME,
  //       resEntity: RESPONSIBLE_ENTITY,
  //       popDelimit: POPULATION_DELIMITATION,
  //       geoArea: GEOGRAPHIC_AREA,
  //       projDesc: PROJECT_DESCRIPTION
  //     }
  //     console.log("🚀 ~ file: new-alternative.component.ts:581 ~ NewAlternativeComponent ~ saveIdeaAlternative ~ NEW_ALTERNATIVE:", NEW_ALTERNATIVE)
  //     const dialogRef = this.dialog.open(AlertDialogComponent, {
  //       width: '250px',
  //       data: { title: 'Crear Alternativa', description: '¿Esta Seguro que desea guardar los datos de la Alternativa?', confirmation: true }
  //     });

  //     dialogRef.afterClosed().subscribe(result => {
  //       console.log('The dialog was closed', result);
  //       if (result === true) {

  //         // Code of Work

  //         this.generalInformationService.sendAlternative(NEW_ALTERNATIVE).subscribe(alternative => {

  //           alternatives.push(alternative)

  //           this.ideaStore.dispatch(SET_IDEA_ALTERNATIVES({ alternatives }))
  //           this.ideaStore.dispatch(CLOSE_FULL_DRAWER2())
  //           this.stepper.reset();
  //         });
  //       }

  //       return;
  //     });
  //     return
  //   }

  //   // Esto aplica solo cuando se esta creado una idea con sus alternativas al mismo timepo
  //   const NEW_ALTERNATIVE: IdeaAlternative = {
  //     sectionBIId: '',
  //     preName: PRELIMINAR_NAME,
  //     resEntity: RESPONSIBLE_ENTITY,
  //     popDelimit: POPULATION_DELIMITATION,
  //     geoArea: GEOGRAPHIC_AREA,
  //     projDesc: PROJECT_DESCRIPTION
  //   }

  //   const dialogRef = this.dialog.open(AlertDialogComponent, {
  //     width: '250px',
  //     data: { title: 'Crear Alternativa', description: '¿Esta Seguro que desea guardar los datos de la Alternativa?', confirmation: true }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed', result);
  //     if (result === true) {
  //       // Code of Work
  //       alternatives.push(NEW_ALTERNATIVE)
  //       this.stepper.reset();

  //       this.ideaStore.dispatch(SET_IDEA_ALTERNATIVES({ alternatives }))
  //       this.alternativeStore.dispatch(DELETE_DATA_GEOS())
  //       this.ideaStore.dispatch(CLOSE_FULL_DRAWER2())

  //     }
  //     else {
  //       return;
  //     }
  //   });

  // }

  // calculaCobertura(): void {
  //   if (this.populationDelimitation.value.estimateBeneficiaries) {
  //     let estBenefic = this.populationDelimitation.value.estimateBeneficiaries;
  //     let tpop = this.totalGender;

  //     let multCov = (estBenefic / tpop);
  //     let resCov = (multCov * 100);

  //     this.coverageText = resCov.toFixed(2);

  //   }
  // }
}
