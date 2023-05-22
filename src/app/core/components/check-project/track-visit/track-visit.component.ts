import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

import { IAccessRoads, IDisasters, IMeansTransport, IProject, IThreatTypes, ITrack, IVisitCard } from 'src/app/core/models/seguimiento';
import { CheckProjectStore, GeograficoStore, SectorAdvisedStore } from 'src/app/modules/check-project/store/reducers';
import { SET_EDIT_PROJECT, SET_TRACKING } from 'src/app/modules/check-project/store/actions';
import { ChekProjectService } from 'src/app/modules/check-project/services/chek-project.service';
import { ModalGuideComponent } from '../modal-guide/modal-guide.component';
import { CLOSE_DRAWER2 } from 'src/app/core/store/actions';
import { SharedModule } from 'src/app/shared/shared.module';
import { Departament } from 'src/app/core/models/adicionales';

@Component({
  selector: 'app-track-visit',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './track-visit.component.html',
  styleUrls: ['./track-visit.component.scss']
})
export class TrackVisitComponent implements OnInit, OnDestroy{

  @ViewChild('stepper') stepper: MatStepper
  track = new FormGroup({
    iapa: new FormControl(2, Validators.required),
    iapb: new FormControl(2, Validators.required),
    iapc: new FormControl(2, Validators.required),
    reportDate: new FormControl(moment(), Validators.required),
  })

  visitCard = new FormGroup({
    codePreinv: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    visitDate: new FormControl(null, Validators.required),
    deptoDel: new FormControl('', Validators.required),
    specialistName: new FormControl('', Validators.required),
    proposalName: new FormControl('', Validators.required),
    mountAprox: new FormControl(null, Validators.required),

    region: new FormControl(null, Validators.required),
    depto: new FormControl('', Validators.required),
    municip: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    typeAddress: new FormControl(false, Validators.required),
    catLocation: new FormControl('Ciudad', Validators.required),
    typeClimate: new FormControl('Cálido', Validators.required),
    avgTemperature: new FormControl('', Validators.required),

    distanceKm: new FormControl('', Validators.required),
    nameHeadboard: new FormControl('', Validators.required),// TODO:Pendiente

    isDrinkingWater: new FormControl(true, Validators.required),
    isDrainageNetwork: new FormControl(true, Validators.required),
    isElectricity: new FormControl(true, Validators.required),
    isPhoneService: new FormControl(true, Validators.required),
    isDrinkableWhater: new FormControl(true, Validators.required),
    garbageDisposal: new FormControl('Servicio municipal', Validators.required),
    serviceInf: new FormControl([], Validators.required),

    latitud: new FormControl('', Validators.required),
    longitud: new FormControl('', Validators.required),
    gtmx: new FormControl('', Validators.required),
    gtmy: new FormControl('', Validators.required),
    elevation: new FormControl('', Validators.required),
    msnm: new FormControl('', Validators.required),

    infRealEstate: new FormControl('Construccion', Validators.required),
    groundConditions: new FormControl('Plano', Validators.required),
    approximateSlope: new FormControl(null, Validators.required),
    soilType: new FormControl('Arenoso', Validators.required),
    realEstateArea: new FormControl(null, Validators.required),

    northMeasure: new FormControl(null, Validators.required),
    southMeasure: new FormControl(null, Validators.required),
    eastMeasure: new FormControl(null, Validators.required),
    westMeasure: new FormControl(null, Validators.required),
    northBorder: new FormControl('', Validators.required),
    southBorder: new FormControl('', Validators.required),
    eastBorder: new FormControl('', Validators.required),
    westBorder: new FormControl('', Validators.required),

    legalSituation: new FormControl('Es un bien del Estado', Validators.required),

    basicServRS: new FormControl('Edificio', Validators.required),
    isElectricityRS: new FormControl(true, Validators.required),
    isPhoneRS: new FormControl(true, Validators.required),
    isDrainageRS: new FormControl(true, Validators.required),
    isDrinkingWRS: new FormControl(true, Validators.required),
    garbageRS: new FormControl('Servicio municipal', Validators.required),

    isReqFinance: new FormControl(false, Validators.required),
    desReqFinance: new FormControl(''),
    appStatus: new FormControl('Atendida', Validators.required),

    availableOrg: new FormControl([], Validators.required),
    theirAgree: new FormControl(false),
    specifyAnswer: new FormControl(''),

    techNameEpi: new FormControl('', Validators.required),
    techPosEpi: new FormControl('', Validators.required),
    techProfEpi: new FormControl('', Validators.required),
    observationsGeneral: new FormControl(''),

    images: new FormControl('')
  })

  catLocations = ['Ciudad', 'Villa', 'Pueblo', 'Colonia', 'Asentamiento', 'Aldea', 'Caserio', 'Paraje', 'Finca', 'Otro']
  typeClimates = ['Cálido', 'templado', 'Frio']
  accessRoads = [
    {
      name: 'Seca',
      options: [
        {
          name: 'Pavimento',
          active: false
        },
        {
          name: 'Terraceria',
          active: false
        },
        {
          name: 'Vereda',
          active: false
        },
        {
          name: 'Ríos/Lagos',
          active: false
        },
        {
          name: 'Aire',
          active: false
        },
        {
          name: 'Otros',
          active: false
        },
      ]
    },
    {
      name: 'Lluviosa',
      options: [
        {
          name: 'Pavimento',
          active: false
        },
        {
          name: 'Terraceria',
          active: false
        },
        {
          name: 'Vereda',
          active: false
        },
        {
          name: 'Ríos/Lagos',
          active: false
        },
        {
          name: 'Aire',
          active: false
        },
        {
          name: 'Otros',
          active: false
        },
      ]
    },
  ]
  meanstransport = [
    {
      name: 'Seca',
      types: [
        {
          name: 'Terrestres',
          options: [
            {
              name: 'Bus extraurbano',
              active: false
            },
            {
              name: 'Vehiculo liviano',
              active: false
            },
            {
              name: 'Camion grande',
              active: false
            },
            {
              name: 'Camion Mediano',
              active: false
            },
            {
              name: 'Vehiculo 4x4',
              active: false
            },
            {
              name: 'Moto',
              active: false
            },
            {
              name: 'Animal de carga',
              active: false
            },
            {
              name: 'Caminando',
              active: false
            },
          ]
        },
        {
          name: 'Aereos',
          options: [
            {
              name: 'Avion',
              active: false
            },
            {
              name: 'Helicoptero',
              active: false
            },
          ]
        },
        {
          name: 'Maritimos',
          options: [
            {
              name: 'Cayuco',
              active: false
            },
            {
              name: 'Lanca c/remo',
              active: false
            },
            {
              name: 'Lanca c/motor',
              active: false
            },
          ]
        },
      ]
    },
    {
      name: 'Lluviosa',
      types: [
        {
          name: 'Terrestres',
          options: [
            {
              name: 'Bus extraurbano',
              active: false
            },
            {
              name: 'Vehiculo liviano',
              active: false
            },
            {
              name: 'Camion grande',
              active: false
            },
            {
              name: 'Camion Mediano',
              active: false
            },
            {
              name: 'Vehiculo 4x4',
              active: false
            },
            {
              name: 'Moto',
              active: false
            },
            {
              name: 'Animal de carga',
              active: false
            },
            {
              name: 'Caminando',
              active: false
            },
          ]
        },
        {
          name: 'Aereos',
          options: [
            {
              name: 'Avion',
              active: false
            },
            {
              name: 'Helicoptero',
              active: false
            },
          ]
        },
        {
          name: 'Maritimos',
          options: [
            {
              name: 'Cayuco',
              active: false
            },
            {
              name: 'Lanca c/remo',
              active: false
            },
            {
              name: 'Lanca c/motor',
              active: false
            },
          ]
        },
      ]
    },
  ]
  garbageDisposals = ['Servicio municipal', 'Servicio privado', 'La entierran', 'La queman', 'La tiran en cualquier lado']
  serviceInf = ['Servicio de salud', 'Bomberos', 'Estación de policía', 'Mercado', 'Alcaldía auxiliar', 'Plaza/parque', 'Salón comunal', 'Farmacias', 'Escuela', 'Iglesia', 'Fábricas', 'Cementerio', 'Hotel']

  disasters: IDisasters[] = [];
  date = new FormControl('', Validators.required)
  hour = new FormControl('', Validators.required)
  eventType = new FormControl('Deslizamientos', Validators.required)
  causes = new FormControl('', Validators.required)
  impact = new FormControl('', Validators.required)
  recurrence = new FormControl('6 meses', Validators.required)
  typeEvents = ['Deslizamientos', 'Actividad volcánica', 'Inundaciones', 'Sismos', 'Huracanes']
  recurrences = ['6 meses', 'Anual', '5 años o más']

  infRealEstates = ['Construccion', 'Ampliacion', 'Mejoramiento', 'Reposicion']
  groundConditions = ['Plano', 'Inclinado']
  soilType = ['Arenoso', 'Rocoso', 'Arcilloso']
  legalSituations = ['Es un bien del estado', 'En proceso de compra', 'Es proceso de traslado a la institucion', 'Otro']
  garbageRS = ['Servicio municipal', 'Servicio privado', 'La entierran', 'La queman', 'La tiran en cualquier lado']
  appStatus = ['Atendida', 'En proceso de aprobacion', 'Rechazada']
  threatTypes = [
    {
      name: 'Naturales',
      options: [
        {
          name: 'Deslizamientos',
          value: 3
        },
        {
          name: 'Inundaciones',
          value: 3
        },
        {
          name: 'Sismos',
          value: 3
        },
        {
          name: 'Actividad Volcánica',
          value: 3
        },
        {
          name: 'Huracanes',
          value: 3
        },
        {
          name: 'Hundimientos',
          value: 3
        },
        {
          name: 'Barrancos',
          value: 3
        },
        {
          name: 'Rios/Quebradas',
          value: 3
        },
      ]
    },
    {
      name: 'Antropogenicas',
      options: [
        {
          name: 'Contaminacion',
          value: 3
        },
        {
          name: 'Incendios',
          value: 3
        },
        {
          name: 'Cementerios',
          value: 3
        },
        {
          name: 'Basurereos',
          value: 3
        },
        {
          name: 'Mala práctica constructiva',
          value: 3
        },
        {
          name: 'Daño provocado por terceros',
          value: 3
        },
        {
          name: 'Inadecuado uso del suelo',
          value: 3
        },
      ]
    },
  ]
  orgs = ['Politicas', 'Religiosas', 'Deportivas', 'Sociales', 'De mujeres', 'Cooperativas', 'Comités', 'Cocodes']
  imgTypes = ['sketch', 'realState', 'environment']

  departamentos: Departament[] = [];
  municipios: Departament[] = [];
  departamentoStoreSubscription = new Subscription();
  currentActivity: string; //borrar
  checkProjectSubscription = new Subscription()
  project: IProject = null;

  constructor(
    private checkProjectStore: Store<CheckProjectStore>,
    private checkProjectService: ChekProjectService,
    private sectorStore: Store<SectorAdvisedStore>,
    private geograficoStore: Store<GeograficoStore>,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.checkProjectSubscription = this.checkProjectStore.select('checkProject')
      .subscribe(state => {
        if (state.project) {
          this.project = state.project
        }
        if (state.track) {
          this.currentActivity = state.track.activity
        }
      })

    this.departamentoStoreSubscription = this.geograficoStore.select('geografico')
      .subscribe(state => {
        this.departamentos = state.geograficos;
      })

  }

  ngOnDestroy(): void {
    this.checkProjectSubscription?.unsubscribe()
    this.departamentoStoreSubscription?.unsubscribe()
  }

  closeDrawer2() {
    this.checkProjectStore.dispatch(CLOSE_DRAWER2())
  }

  openDialog() {
    this.dialog.open(ModalGuideComponent, {
    });
  }

  addDisaster(): void {
    const disaster: IDisasters = {
      no: (this.disasters.length + 1).toString(),
      date: this.date.value,
      hour: this.hour.value,
      eventType: this.eventType.value,
      causes: this.causes.value,
      impact: this.impact.value,
      recurrence: this.recurrence.value,
    }

    this.disasters.push(disaster)
    this.date.setValue('')
    this.hour.setValue('')
    this.eventType.setValue('Deslizamientos')
    this.causes.setValue('')
    this.impact.setValue('')
    this.recurrence.setValue('6 meses')
  }

  removeDisaster(index: number): void {
    if (index > -1) {
      this.disasters.splice(index, 1)
    }
  }

  selecDepartament(): void {
    // window.alert('Opción aun no habilitada')
    let dptoSelect = this.visitCard.controls['depto'].value;
    let dpto = this.departamentos.find((dto: Departament) => dto.NOMBRE == dptoSelect);
    if (dpto) { this.municipios = dpto.municipios }
  }

  verifyValue(event: any, maxNumber: number) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    input.value = Math.min(value, maxNumber).toString();
  }

  onSubmit(): void {
    const {
      iapa,
      iapb,
      iapc,
      reportDate,
    } = this.track.value

    const NEW_TRACK: ITrack = {
      iapa,
      iapb,
      iapc,
      activity: this.currentActivity,
      reportDate,
      projectId: this.project.id,
      advisoryEpi: null,
      advisoryDoc: null
    }

    if (this.currentActivity === 'VISITA DE CAMPO') {
      /* #region format data */
      let accessRoads: IAccessRoads[] = [];

      this.accessRoads.map(r => {

        r.options.map(o => {

          if (o.active) {
            accessRoads.push({
              name: o.name,
              climate: r.name
            })
          }

        })

      })

      let meanstransport: IMeansTransport[] = []

      this.meanstransport.map(m => {

        m.types.map(t => {

          t.options.map(o => {

            meanstransport.push({
              name: o.name,
              climate: m.name,
              type: t.name
            })

          })

        })

      })

      let threatTypes: IThreatTypes[] = []

      this.threatTypes.map(t => {

        t.options.map(o => {

          threatTypes.push({
            name: o.name,
            type: t.name,
            value: o.value
          })

        })

      })

      this.visitCard.controls['serviceInf'].setValue(
        this.visitCard.controls['serviceInf'].value.map(item => {
          return {
            name: item
          }
        })
      )

      this.visitCard.controls['availableOrg'].setValue(
        this.visitCard.controls['availableOrg'].value.map(item => {
          return {
            name: item
          }
        })
      )
      /* #endregion */

      //TODO: completar subida de imagenes
      console.log(this.visitCard.controls['images'].value);

      const {
        codePreinv,
        visitDate,
        deptoDel,
        specialistName,
        proposalName,
        mountAprox,
        region,
        depto,
        municip,
        address,
        typeAddress,
        catLocation,
        typeClimate,
        avgTemperature,
        distanceKm,
        nameHeadboard,
        isDrinkingWater,
        isDrainageNetwork,
        isElectricity,
        isPhoneService,
        isDrinkableWhater,
        garbageDisposal,
        latitud,
        longitud,
        gtmx,
        gtmy,
        elevation,
        msnm,
        infRealEstate,
        groundConditions,
        approximateSlope,
        soilType,
        realEstateArea,
        northMeasure,
        southMeasure,
        eastMeasure,
        westMeasure,
        northBorder,
        southBorder,
        eastBorder,
        westBorder,
        legalSituation,
        basicServRS,
        isElectricityRS,
        isPhoneRS,
        isDrainageRS,
        isDrinkingWRS,
        garbageRS,
        isReqFinance,
        desReqFinance,
        appStatus,
        theirAgree,
        specifyAnswer,
        techNameEpi,
        techPosEpi,
        techProfEpi,
        observationsGeneral,
        serviceInf,
        availableOrg
      } = this.visitCard.value

      const NEW_VISIT_CARD: IVisitCard = {
        codePreinv,
        visitDate,
        deptoDel,
        specialistName,
        proposalName,
        mountAprox,
        region,
        depto,
        municip,
        address,
        typeAddress,
        catLocation,
        typeClimate,
        avgTemperature,
        distanceKm,
        nameHeadboard,
        isDrinkingWater,
        isDrainageNetwork,
        isElectricity,
        isPhoneService,
        isDrinkableWhater,
        garbageDisposal,
        latitud,
        longitud,
        gtmx,
        gtmy,
        elevation,
        msnm,
        infRealEstate,
        groundConditions,
        approximateSlope,
        soilType,
        realEstateArea,
        northMeasure,
        southMeasure,
        eastMeasure,
        westMeasure,
        northBorder,
        southBorder,
        eastBorder,
        westBorder,
        legalSituation,
        basicServRS,
        isElectricityRS,
        isPhoneRS,
        isDrainageRS,
        isDrinkingWRS,
        garbageRS,
        isReqFinance,
        desReqFinance,
        appStatus,
        theirAgree,
        specifyAnswer,
        techNameEpi,
        techPosEpi,
        techProfEpi,
        observationsGeneral,
        accessRoads,
        meanstransport,
        serviceInf,
        disasters: this.disasters,
        threatTypes,
        imgVisit: [],
        availableOrg
      }

      NEW_TRACK.visitCard = { ...NEW_VISIT_CARD }


      this.checkProjectService.addTrack(NEW_TRACK, this.project.id)
        .subscribe(project => {

          this.checkProjectStore.dispatch(SET_TRACKING({ tracking: project.tracking }))
          this.checkProjectStore.dispatch(SET_EDIT_PROJECT({ checkProject: project }))

        })

      this.stepper.reset()
      this.disasters = []
      this.checkProjectStore.dispatch(CLOSE_DRAWER2())
    }
  }
}
