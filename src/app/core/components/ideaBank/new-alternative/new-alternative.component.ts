import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { Departament, IObject, Procesos, Process, User } from 'src/app/core/models/adicionales';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralInformation } from 'src/app/core/models/informationGeneral';
import { DataGeo, Denomination, ExecutionTime, GeographicArea, IdeaAlternative, IdeaAlternativeOne, PopulationDelimitation, PreliminaryName, ProjectDescription, ReferencePopulation, ResponsibleEntity } from 'src/app/core/models/alternative';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AlternativeStore, GeograficoStore, IdeaStore, ObjectStore, ProcesoStore } from 'src/app/modules/idea-bank/store/reducers';
import { DenominationStore, referencePopulationstore } from 'src/app/modules/config/store/reducers';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppState } from 'src/app/core/store/app.reducer';
import { MatDialog } from '@angular/material/dialog';
import { IdeaService } from 'src/app/modules/idea-bank/services/idea.service';
import { READ_DENOMINATIONS, READ_REFERENCE_POPULATIONS } from 'src/app/modules/config/store/actions';
import { DELETE_DATA_GEOS, READ_GEOGRAFICOS, READ_OBJECTS, READ_PROCESOS, REMOVE_DATA_GEO, SET_ALTERNATIVE, SET_IDEA_ALTERNATIVES } from 'src/app/modules/idea-bank/store/actions';
import { IPopulationAlt } from 'src/app/core/models/alternative/populationAlt';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { CLOSE_DRAWER2, OPEN_DRAWER3 } from 'src/app/core/store/actions';
import { UploadService } from '../../../services/upload.service';
import { ITypeProject } from '../../../models/adicionales/typeProject';

@Component({
  selector: 'app-new-alternative',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-alternative.component.html',
  styleUrls: ['./new-alternative.component.scss']
})
export class NewAlternativeComponent implements OnInit, OnDestroy {

  terrainsSend: DataGeo[] = [];
  terrainsWithImages: any[] = [];

  /* #region catálogos */
  references: ReferencePopulation[] = [];
  referenceStoreSubscription = new Subscription();

  denominations: Denomination[] = [];
  denominationStoreSubscription = new Subscription();

  typeProjects: ITypeProject[] = [];
  typeProjectStoreSubscription = new Subscription();


  departamentos: Departament[] = [];
  municipios: Departament[] = [];
  departamentoStoreSubscription = new Subscription();

  objetos: IObject[] = [];
  objetoStoreSubscription = new Subscription();

  processes: Procesos = { noFormaCapital: [], formaCapital: [] };
  processStoreSubscription = new Subscription();

  dataSourceProcesos: Process[] = [];
  /* #endregion */

  /* #region  Formularios */
  preliminaryName = new FormGroup({
    typeProject: new FormControl('Forma Capital Fijo', Validators.required),
    proccess: new FormControl('', Validators.required),
    object: new FormControl('', Validators.required),
    departament: new FormControl('', Validators.required),
    municipality: new FormControl('', Validators.required),
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

  ideaStoreSubscription = new Subscription();
  currentIdea: GeneralInformation = null;

  alternativeStoreSubscription = new Subscription()
  currentAlternative: IdeaAlternative
  dataGeos: DataGeo[] = [];
  displayedColumns = ['statusDescribe', 'actions'];
  dataSource = new MatTableDataSource<DataGeo>([])

  coverageText = '0'
  totalGender = 0;

  sessionSubscription: Subscription;
  usuario!: User;

  constructor(
    private ideaStore: Store<IdeaStore>,
    private referencePopulationStore: Store<referencePopulationstore>,
    private denominationStore: Store<DenominationStore>,
    private geograficoStore: Store<GeograficoStore>,
    private objectStore: Store<ObjectStore>,
    private procesoStore: Store<ProcesoStore>,
    private ideaService: IdeaService,
    public store: Store<AppState>,
    public alternativeStore: Store<AlternativeStore>,
    public dialog: MatDialog,
    private uploadService: UploadService,
  ) { }

  ngOnInit(): void {

    this.populationDelimitation.valueChanges.subscribe(values => {
      this.totalGender = +values.menQty + +values.womenQty;
    });

    // Disable input control name Epi
    this.responsibleEntity.controls.nameEPI.disable();
    this.populationDelimitation.controls.menQty.setValue(0)
    this.populationDelimitation.controls.womenQty.setValue(0)

    this.sessionSubscription = this.store.select('session').subscribe(session => {
      this.usuario = session.session.usuario;
      if (!this.currentAlternative) {
        this.responsibleEntity.controls['nameEPI'].setValue(this.usuario?.name_inst)
      }
    });

    this.alternativeStoreSubscription = this.alternativeStore.select('alternative')
      .subscribe(state => {

        if (state.alternative) {
          this.currentAlternative = state.alternative
          this.setEditValues()
        } else {

          if (this.currentAlternative) {
            this.currentAlternative = null
            // this.stepper ? this.stepper.reset() : null
          }

        }

        this.dataGeos = state.dataGeos
        this.dataSource = new MatTableDataSource<DataGeo>(this.dataGeos)
      })

    //#region Catalogos
    this.denominationStoreSubscription = this.denominationStore.select('denomination')
      .subscribe(state => {
        this.denominations = state.denominations;
      })


    this.departamentoStoreSubscription = this.geograficoStore.select('geografico')
      .subscribe(state => {
        this.departamentos = state.geograficos;
      })


    this.objetoStoreSubscription = this.objectStore.select('object')
      .subscribe(state => {
        this.objetos = state.objects;
      })


    this.processStoreSubscription = this.procesoStore.select('proceso')
      .subscribe(state => {
        this.processes = state.procesos;
        this.dataSourceProcesos = this.processes.formaCapital;

      })


    this.referenceStoreSubscription = this.referencePopulationStore.select('referencePopulation')
      .subscribe(state => {
        this.references = state.referencePopulations;
      })

    //#endregion

    this.ideaStoreSubscription = this.ideaStore.select('idea')
      .subscribe(state => {
        this.currentIdea = state.idea;
      })

    this.terrainValidators()

    this.projectDescription.controls['withFormulationProcess'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.projectDescription.controls['formulationProcess'].enable()
          this.projectDescription.controls['formulationProcessDescription'].enable()
          return
        }

        this.projectDescription.controls['formulationProcess'].disable()
        this.projectDescription.controls['formulationProcessDescription'].disable()
      });
  }

  ngOnDestroy(): void {
    this.sessionSubscription?.unsubscribe()
    this.referenceStoreSubscription?.unsubscribe()
    this.denominationStoreSubscription?.unsubscribe()
    this.departamentoStoreSubscription?.unsubscribe()
    this.objetoStoreSubscription?.unsubscribe()
    this.processStoreSubscription?.unsubscribe()
    this.ideaStoreSubscription?.unsubscribe()
    this.alternativeStoreSubscription?.unsubscribe()
  }

  closeDrawer2(): void {
    this.store.dispatch(CLOSE_DRAWER2())
  }

  openDrawer3(width3: string, component3: string): void {
    this.store.dispatch(OPEN_DRAWER3({ width3, component3 }))
  }

  terrainValidators(): void {
    this.geographicArea.controls['oneAvailableTerrain'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.geographicArea.controls['availableTerrain'].disable()
          this.geographicArea.controls['investPurchase'].disable()
          return
        }

        this.geographicArea.controls['availableTerrain'].enable()
        this.geographicArea.controls['investPurchase'].enable()
      });
    this.geographicArea.controls['availableTerrain'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.geographicArea.controls['oneAvailableTerrain'].disable()
          this.geographicArea.controls['investPurchase'].disable()
          return
        }

        this.geographicArea.controls['oneAvailableTerrain'].enable()
        this.geographicArea.controls['investPurchase'].enable()
      });
    this.geographicArea.controls['investPurchase'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.geographicArea.controls['oneAvailableTerrain'].disable()
          this.geographicArea.controls['availableTerrain'].disable()
          return
        }

        this.geographicArea.controls['oneAvailableTerrain'].enable()
        this.geographicArea.controls['availableTerrain'].enable()
      });
  }

  selecDepartament(): void {
    let dptoSelect = this.preliminaryName.controls['departament'].value;
    let dpto = this.departamentos.find((dto: Departament) => dto.NOMBRE == dptoSelect);
    if (dpto) { this.municipios = dpto.municipios }
  }

  enableTypeProject(): void {
    const TYPE = this.preliminaryName.controls['typeProject'].value

    if (TYPE === 'Forma Capital Fijo') {
      this.dataSourceProcesos = this.processes.formaCapital
      return
    }

    this.preliminaryName.controls['proccess'].setValue(null)
    this.dataSourceProcesos = this.processes.noFormaCapital
    this.preliminaryName.controls['object'].setValue(null)
    this.preliminaryName.controls['departament'].setValue(null)
    this.preliminaryName.controls['municipality'].setValue(null)
  }

  removeDataGeo(index: number): void {
    this.alternativeStore.dispatch(REMOVE_DATA_GEO({ index }))
  }

  setEditValues(): void {

    this.preliminaryName.controls['typeProject'].setValue(this.currentAlternative.preName.typeProject)
    this.preliminaryName.controls['proccess'].setValue(this.currentAlternative.preName.proccess)
    this.preliminaryName.controls['object'].setValue(this.currentAlternative.preName.object)
    this.preliminaryName.controls['departament'].setValue(this.currentAlternative.preName.departament)
    this.preliminaryName.controls['municipality'].setValue(this.currentAlternative.preName.municipality)

    this.responsibleEntity.controls['nameEPI'].setValue(this.currentAlternative.resEntity.nameEPI)
    this.responsibleEntity.controls['executionUnit'].setValue(this.currentAlternative.resEntity.executionUnit)
    this.responsibleEntity.controls['leaderName'].setValue(this.currentAlternative.resEntity.leaderName)
    this.responsibleEntity.controls['email'].setValue(this.currentAlternative.resEntity.email)
    this.responsibleEntity.controls['phone'].setValue(this.currentAlternative.resEntity.phone)

    this.populationDelimitation.controls['referencePopulation'].setValue(this.currentAlternative.popDelimit.refPop.name)
    this.populationDelimitation.controls['denomination'].setValue(this.currentAlternative.popDelimitdenmtion.name)
    this.populationDelimitation.controls['menQty'].setValue(this.currentAlternative.popDelimit.populations[0].total)
    this.populationDelimitation.controls['womenQty'].setValue(this.currentAlternative.popDelimit.populations[1].total)
    this.totalGender = this.currentAlternative.popDelimit.totalPopulation;
    this.coverageText = this.currentAlternative.popDelimit.coverage?.toString();
    // this.populationDelimitation.controls['gender'].setValue(this.currentAlternative.popDelimit.gender)
    this.populationDelimitation.controls['estimateBeneficiaries'].setValue(this.currentAlternative.popDelimit.estimateBeneficiaries)
    this.populationDelimitation.controls['preliminaryCharacterization'].setValue(this.currentAlternative.popDelimit.preliminaryCharacterization)

    this.geographicArea.controls['oneAvailableTerrain'].setValue(this.currentAlternative.geoArea?.oneAvailableTerrain)
    this.geographicArea.controls['availableTerrain'].setValue(this.currentAlternative.geoArea?.availableTerrain)
    this.geographicArea.controls['investPurchase'].setValue(this.currentAlternative.geoArea?.investPurchase)

    this.projectDescription.controls['projectType'].setValue(this.currentAlternative.projDesc?.projectType)
    this.projectDescription.controls['formulationProcess'].setValue(this.currentAlternative.projDesc?.formulationProcess)
    this.projectDescription.controls['formulationProcessDescription'].setValue(this.currentAlternative.projDesc?.formulationProcessDescription)
    this.projectDescription.controls['descriptionInterventions'].setValue(this.currentAlternative.projDesc?.descriptionInterventions)
    this.projectDescription.controls['complexity'].setValue(this.currentAlternative.projDesc?.complexity)
    this.projectDescription.controls['estimatedCost'].setValue(this.currentAlternative.projDesc?.estimatedCost)
    this.projectDescription.controls['investmentCost'].setValue(this.currentAlternative.projDesc?.investmentCost)
    this.projectDescription.controls['foundingSourcesName'].setValue(this.currentAlternative.projDesc?.foundingSourcesName)

    this.executionTime.controls['tentativeTermMonth'].setValue(this.currentAlternative.projDesc?.execTime.tentativeTermMonth)
    this.executionTime.controls['tentativeTermYear'].setValue(this.currentAlternative.projDesc?.execTime.tentativeTermYear)
    this.executionTime.controls['executionDateMonth'].setValue(this.currentAlternative.projDesc?.execTime.executionDateMonth)
    this.executionTime.controls['executionDateYear'].setValue(this.currentAlternative.projDesc?.execTime.executionDateYear)
    this.executionTime.controls['finishDateMonth'].setValue(this.currentAlternative.projDesc?.execTime.finishDateMonth)
    this.executionTime.controls['finishDateYear'].setValue(this.currentAlternative.projDesc?.execTime.finishDateYear)
    this.executionTime.controls['annual'].setValue(Boolean(this.currentAlternative.projDesc?.execTime.annual))

    setTimeout(() => {

      this.selecDepartament()

    }, 500);
  }

  saveAlternativeP1(): void {

    if (this.currentAlternative) {
      return
    }

    if (this.preliminaryName.invalid || this.responsibleEntity.invalid || this.populationDelimitation.invalid) {
      return
    }

    const {
      typeProject,
      proccess,
      object,
      departament,
      municipality,
    } = this.preliminaryName.value

    const PRELIMINAR_NAME: PreliminaryName = {
      typeProject,
      proccess,
      object,
      departament,
      municipality,
      preliminaryName: `${proccess}, ${object}, ${municipality}, ${departament}`
    }

    const {
      nameEPI,
      executionUnit,
      leaderName,
      email,
      phone,
    } = this.responsibleEntity.value

    const RESPONSIBLE_ENTITY: ResponsibleEntity = {
      nameEPI: this.usuario?.name_inst,
      executionUnit,
      leaderName,
      email,
      phone,
    }

    const {
      referencePopulation,
      denomination,
      menQty,
      womenQty,
      estimateBeneficiaries,
      preliminaryCharacterization,
    } = this.populationDelimitation.value

    let populations: IPopulationAlt[] = [
      { type: 'Hombres', total: menQty },
      { type: 'Mujeres', total: womenQty },
    ]

    const POPULATION_DELIMITATION: PopulationDelimitation = {
      refPopId: referencePopulation,
      denId: denomination,
      totalPopulation: this.totalGender,
      estimateBeneficiaries,
      preliminaryCharacterization,
      populations
    }

    const NEW_ALTERNATIVE_P1: IdeaAlternativeOne = {
      sectionBIId: this.currentIdea.codigo,
      preName: PRELIMINAR_NAME,
      resEntity: RESPONSIBLE_ENTITY,
      popDelimit: POPULATION_DELIMITATION
    }

    let alternatives: IdeaAlternative[] = this.currentIdea?.alternatives ? [...this.currentIdea.alternatives] : [];

    this.ideaService.sendFirstPartAlternative(NEW_ALTERNATIVE_P1)
      .subscribe(alternative => {

        this.alternativeStore.dispatch(SET_ALTERNATIVE({ alternative }))

      })

  }

  saveIdeaAlternative(): void {

    const {
      availableTerrain,
      oneAvailableTerrain,
      investPurchase,
    } = this.geographicArea.value
    console.log("🚀 ~ file: new-alternative.component.ts:468 ~ NewAlternativeComponent ~ saveIdeaAlternative ~ this.geographicArea.value:", this.geographicArea.value)

    const GEOGRAPHIC_AREA: GeographicArea = {
      availableTerrain,
      oneAvailableTerrain,
      investPurchase,
      dataGeo: this.dataGeos
    }
    console.log("🚀 ~ file: new-alternative.component.ts:470 ~ NewAlternativeComponent ~ saveIdeaAlternative ~ GEOGRAPHIC_AREA:", GEOGRAPHIC_AREA)

    const {
      tentativeTermMonth,
      tentativeTermYear,
      executionDateMonth,
      executionDateYear,
      finishDateMonth,
      finishDateYear,
      annual
    } = this.executionTime.value

    const EXECUTION_TIME: ExecutionTime = {
      tentativeTermMonth,
      tentativeTermYear,
      executionDateMonth,
      executionDateYear,
      finishDateMonth,
      finishDateYear,
      annual: 0
    }

    if (this.executionTime.value.annual) {
      EXECUTION_TIME.annual = 1
    } else if (!this.executionTime.value.annual) {
      EXECUTION_TIME.annual = 0
    }

    const {
      projectType,
      formulationProcess,
      formulationProcessDescription,
      descriptionInterventions,
      complexity,
      estimatedCost,
      investmentCost,
      foundingSourcesName,
    } = this.projectDescription.value

    const PROJECT_DESCRIPTION: ProjectDescription = {
      projectType,
      formulationProcess,
      formulationProcessDescription,
      descriptionInterventions,
      complexity,
      estimatedCost,
      investmentCost,
      foundingSourcesName,
      fundingSources: 1,
      execTime: EXECUTION_TIME
    }

    if (tentativeTermYear > executionDateYear && tentativeTermYear > finishDateYear && executionDateYear > finishDateYear) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '250px',
        data: { title: 'Error al seleccionar Fechas', description: 'Verifique que las fechas seleccionadas cumplan con un periodo de trabajo real.' }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      });
      return;
    }

    let alternatives: IdeaAlternative[] = this.currentIdea.alternatives ? [...this.currentIdea.alternatives] : [];

    // editar
    if (this.currentAlternative.geoArea) {

      this.currentAlternative = {
        ...this.currentAlternative,
        geoArea: GEOGRAPHIC_AREA,
        projDesc: PROJECT_DESCRIPTION
      }

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '250px',
        data: { title: 'Editar Alternativa', description: '¿Esta Seguro que desea guardar los datos de la Alternativa?', confirmation: true }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        if (result === true) {
          // Code of Work

          this.ideaService.updateAlternative(this.currentAlternative).subscribe(alternative => {

            alternatives = alternatives.map(a => {

              if (a.codigo === this.currentAlternative.codigo) {
                return {
                  ...alternative
                }
              }

              return {
                ...a
              }


            })
            this.ideaStore.dispatch(SET_IDEA_ALTERNATIVES({ alternatives }))
            this.ideaStore.dispatch(CLOSE_DRAWER2())
            // this.stepper.reset();
          });
        }
        else {
          return;
        }
      });

      return
    }


    if (this.currentAlternative.codigo) {
      const NEW_ALTERNATIVE: IdeaAlternative = {
        ...this.currentAlternative,
        geoArea: GEOGRAPHIC_AREA,
        projDesc: PROJECT_DESCRIPTION
      }

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '250px',
        data: { title: 'Crear Alternativa', description: '¿Esta Seguro que desea guardar los datos de la Alternativa?', confirmation: true }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        if (result === true) {

          // Code of Work
          if (NEW_ALTERNATIVE.geoArea.dataGeo && NEW_ALTERNATIVE.geoArea.dataGeo.length > 0){
            this.terrainsSend = NEW_ALTERNATIVE.geoArea.dataGeo;
          }
          this.ideaService.sendSecondPartAlternative(NEW_ALTERNATIVE,this.currentAlternative.codigo).subscribe(alternative => {
            if (alternative.geoArea.dataGeo && alternative.geoArea.dataGeo.length > 0) {

              for (let i = 0; i < this.terrainsSend.length; i++) {

                for (let j = 0; j < alternative.geoArea.dataGeo.length; j++) {
                  if (
                    this.terrainsSend[i].statusDescribe === alternative.geoArea.dataGeo[j].statusDescribe
                    && this.terrainsSend[i].minutesx === alternative.geoArea.dataGeo[j].minutesx
                    && this.terrainsSend[i].minutesy === alternative.geoArea.dataGeo[j].minutesy
                  ) {
                    if (this.terrainsSend[i].image){
                      this.terrainsWithImages.push({ image: this.terrainsSend[i].image.files[0], id: alternative.geoArea.dataGeo[j].id });
                    }
                  }
                }
              }

              if (this.terrainsWithImages && this.terrainsWithImages.length > 0) {
                let contador = 0;

                for (let index = 0; index < this.terrainsWithImages.length; index++) {
                  const element = this.terrainsWithImages[index];
                  this.uploadService.uploadFile(element.image, 'terrain', element.id).then((response) => {
                    contador++;

                    let alternativesFinalized: IdeaAlternative[] = []
                    if (contador === this.terrainsWithImages.length) {

                      this.ideaService.getAlternativeById(alternative.codigo).subscribe(alternative => {
                        console.log("🚀 ~ file: new-alternative.component.ts:648 ~ NewAlternativeComponent ~ this.ideaService.getAlternativeById ~ alternatives:", alternatives)
                        console.log("🚀 ~ file: new-alternative.component.ts:647 ~ NewAlternativeComponent ~ this.ideaService.getAlternativeById ~ alternative:", alternative)
                        alternativesFinalized = [{...alternative}, ...alternatives]
                        console.log("🚀 ~ file: new-alternative.component.ts:650 ~ NewAlternativeComponent ~ this.ideaService.getAlternativeById ~ alternativesFinalized:", alternativesFinalized)
                      })
                      this.ideaStore.dispatch(CLOSE_DRAWER2())
                      // this.stepper.reset();
                    }
                  });
                }
              }

            } else {
              alternatives.push({...alternative})
            }

          });
        }

        return;
      });
      return
    }

  }

  finishCreateAlternative(alternatives: IdeaAlternative[], alternative: IdeaAlternative): void {



  }

  calculaCobertura(): void {

    if (this.populationDelimitation.controls['estimateBeneficiaries']) {
      const EST_BENEFIC = this.populationDelimitation.controls['estimateBeneficiaries'].value
      const TPOP = this.totalGender

      const MULTCOV = (+EST_BENEFIC / TPOP);
      const RESCOV = (MULTCOV * 100);

      this.coverageText = RESCOV.toFixed(2);
    }
  }
}
