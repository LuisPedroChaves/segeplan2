import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { startWith } from 'rxjs/operators';


import { CheckProjectStore, EntityStore, GeograficoStore, SectorAdvisedStore } from 'src/app/modules/check-project/store/reducers';
import { IAdvisoryEpi, IProject, ITrack } from 'src/app/core/models/seguimiento';
import { READ_ENTITIES, READ_SECTORSADVISED, SET_EDIT_PROJECT, SET_TRACKING } from 'src/app/modules/check-project/store/actions';
import { ModalGuideComponent } from '../modal-guide/modal-guide.component';
import { ChekProjectService } from 'src/app/modules/check-project/services/chek-project.service';
import { CLOSE_DRAWER2 } from 'src/app/core/store/actions';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppState } from 'src/app/core/store/app.reducer';
import { Entity } from 'src/app/core/models/sinafip';
import { ISectorAdvised, IsbSector } from 'src/app/core/models/sinafip/sectorAdvised';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-track-epi',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './track-epi.component.html',
  styleUrls: ['./track-epi.component.scss']
})
export class TrackEpiComponent implements OnInit, OnDestroy {

  @ViewChild('stepper') stepper: MatStepper;
  track = new FormGroup({
    iapa: new FormControl(2, Validators.required),
    iapb: new FormControl(2, Validators.required),
    iapc: new FormControl(2, Validators.required),
    reportDate: new FormControl(moment(), Validators.required),
  })

  advisoryEpi = new FormGroup({
    goal: new FormControl(''),
    action: new FormControl(''),
    entity: new FormControl(''),
    sectorization: new FormControl(''),
    subSectorization: new FormControl(''),
    advTheme: new FormControl('', [Validators.maxLength(200)]),
    participantName: new FormControl(''),
    participantPosition: new FormControl(''),
    menAttended: new FormControl(0),
    womenAttended: new FormControl(0),
    advDate: new FormControl(''),
    reportDate: new FormControl(''),
    counselingModality: new FormControl(''),
    place: new FormControl('', [Validators.maxLength(200)]),
    objective: new FormControl('', [Validators.maxLength(200)]),
    devAdv: new FormControl('', [Validators.maxLength(400)]),
    conclusions: new FormControl('', [Validators.maxLength(200)]),
    commitments: new FormControl('', [Validators.maxLength(200)]),
    specialist: new FormControl(''),
    doc: new FormControl(null),
  })

  checkProjectSubscription = new Subscription();
  sectors: ISectorAdvised[] = [];
  sectosStoreSubscription = new Subscription();
  entities: Entity[] = [];
  entityStoreSubscription = new Subscription();
  project: IProject = null;
  currentActivity: string; // cambiar

  totalAttended = 0;

  subSectors: IsbSector[] = [];
  isDisableSubSectorControl: boolean = true;

  constructor(
    private entityStore: Store<EntityStore>,
    private checkProjectStore: Store<CheckProjectStore>,
    private checkProjectService: ChekProjectService,
    private sectorStore: Store<SectorAdvisedStore>,
    public dialog: MatDialog,
    public store: Store<AppState>,

  ) { }

  ngOnInit(): void {
    this.entityStoreSubscription = this.entityStore.select('entity')
      .subscribe(state => {
        console.log("🚀 ~ file: track-epi.component.ts:92 ~ TrackEpiComponent ~ ngOnInit ~ state:", state)
        this.entities = state.entities;
      })
    this.entityStore.dispatch(READ_ENTITIES())
    this.sectosStoreSubscription = this.sectorStore.select('sectorAdvised')
      .subscribe(state => {

        this.sectors = state.sectorsAdvised;
      })
    this.sectorStore.dispatch(READ_SECTORSADVISED())
    this.checkProjectSubscription = this.checkProjectStore.select('checkProject')
      .subscribe(state => {
        console.log("🚀 ~ file: track-epi.component.ts:93 ~ TrackEpiComponent ~ ngOnInit ~ state:", state)
        if (state.project) {
          this.project = state.project
        }
        this.currentActivity = 'ASESORÍA A LA EPI'
      })

    this.advisoryEpi.valueChanges
      .pipe(startWith(this.advisoryEpi.value))
      .subscribe((value) => {
        const menAttended = value.menAttended;
        const womenAttended = value.womenAttended;

        const total = menAttended + womenAttended;

        this.totalAttended = total;
        console.log('Total:', total);
        // Actualiza la variable o realiza la lógica que desees con el total
      });
  }

  ngOnDestroy(): void {
    this.entityStoreSubscription?.unsubscribe()
    this.checkProjectSubscription?.unsubscribe()
  }

  closeDrawer2() {
    this.checkProjectStore.dispatch(CLOSE_DRAWER2())
  }

  openDialog() {
    this.dialog.open(ModalGuideComponent, {
    });
  }

  verifyValue(event: any, maxNumber: number) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    input.value = Math.min(value, maxNumber).toString();
  }

  onSubmit(): void {
    console.log('Hola onSubmit');

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

    console.log("🚀 ~ file: track-epi.component.ts:136 ~ TrackEpiComponent ~ onSubmit ~ this.currentActivity:", this.currentActivity)
    if (this.currentActivity === 'ASESORÍA A LA EPI') {
      const {
        goal,
        action,
        entity,
        sectorization,
        subSectorization,
        menAttended,
        womenAttended,
        advTheme,
        participantName,
        participantPosition,
        advDate,
        reportDate,
        counselingModality,
        place,
        objective,
        devAdv,
        conclusions,
        commitments,
        specialist,
        doc
      } = this.advisoryEpi.value

      const NEW_ADVISORY_EPI: IAdvisoryEpi = {
        goal,
        action,
        unitSpecific: entity,
        sectorization,
        subSectorization,
        advTheme,
        participantName,
        participantPosition,
        menAttended,
        womenAttended,
        totalAttended: this.totalAttended,
        advDate,
        reportDate,
        counselingModality,
        place,
        objective,
        devAdv,
        conclusions,
        commitments,
        specialist,
        doc
      }

      NEW_TRACK.advisoryEpi = { ...NEW_ADVISORY_EPI }

      this.checkProjectService.addTrack(NEW_TRACK, this.project.id)
        .subscribe(project => {
          console.log("🚀 ~ file: track-epi.component.ts:190 ~ TrackEpiComponent ~ onSubmit ~ project:", project)
          this.checkProjectStore.dispatch(SET_TRACKING({ tracking: project.tracking }))
          this.checkProjectStore.dispatch(SET_EDIT_PROJECT({ checkProject: project }))
        })

      this.stepper.reset()
      this.advisoryEpi.reset({
        doc: null
      })
      this.checkProjectStore.dispatch(CLOSE_DRAWER2())

      return
    }
  }

  sectorSelected(event: MatSelectChange): void {
    let SSECTOR: ISectorAdvised = this.sectors.find((sector: ISectorAdvised) => sector.name == event.value);
    if (SSECTOR.subSectorizations && SSECTOR.subSectorizations.length > 0) {
      this.subSectors = SSECTOR.subSectorizations;
      this.isDisableSubSectorControl = false;
      this.advisoryEpi.controls.subSectorization.enable();
    } else {
      this.subSectors = []
      this.isDisableSubSectorControl = true;
      this.advisoryEpi.controls.subSectorization.reset();
      this.advisoryEpi.controls.subSectorization.disable();
    }
  }
}
