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
import { UploadService } from '../../../services/upload.service';


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
    iapa: new FormControl(0, Validators.required),
    iapb: new FormControl(0, Validators.required),
    iapc: new FormControl(0, Validators.required),
    reportDate: new FormControl(moment(), Validators.required),
  })

  isEditForm = false;
  trackToEdit: ITrack;

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
    objective: new FormControl('', [Validators.maxLength(1000)]),
    devAdv: new FormControl('', [Validators.maxLength(400)]),
    conclusions: new FormControl('', [Validators.maxLength(1000)]),
    commitments: new FormControl('', [Validators.maxLength(1000)]),
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
    private uploadService: UploadService,
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
        if (state.track) {
          if (state.track.advisoryEpi) {
            this.isEditForm = true;
            this.loadValuesAdvisory(state.track)
          }
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

  loadValuesAdvisory(trackLoad: ITrack) {
    this.trackToEdit = trackLoad;
    console.log("🚀 ~ file: track-document.component.ts:154 ~ TrackDocumentComponent ~ loadValuesAdvisory ~ trackLoad:", trackLoad)
    this.track.controls["iapa"].setValue(trackLoad.iapa ?? 0)
    this.track.controls["iapb"].setValue(trackLoad.iapb ?? 0)
    this.track.controls["iapc"].setValue(trackLoad.iapc ?? 0)
    this.track.controls["reportDate"].setValue(moment(trackLoad.reportDate.toString()))

    this.advisoryEpi.controls["action"].setValue(trackLoad.advisoryEpi.action ?? '')
    this.advisoryEpi.controls["advDate"].setValue(trackLoad.advisoryEpi.advDate ?? '')
    this.advisoryEpi.controls["advTheme"].setValue(trackLoad.advisoryEpi.advTheme ?? '')
    this.advisoryEpi.controls["commitments"].setValue(trackLoad.advisoryEpi.commitments ?? '')
    this.advisoryEpi.controls["conclusions"].setValue(trackLoad.advisoryEpi.conclusions ?? '')
    this.advisoryEpi.controls["counselingModality"].setValue(trackLoad.advisoryEpi.counselingModality ?? '')
    this.advisoryEpi.controls["devAdv"].setValue(trackLoad.advisoryEpi.devAdv ?? '')
    this.advisoryEpi.controls["doc"].setValue(trackLoad.advisoryEpi.doc ?? '')
    this.advisoryEpi.controls["entity"].setValue(trackLoad.advisoryEpi.unitSpecific ?? '')
    this.advisoryEpi.controls["goal"].setValue(trackLoad.advisoryEpi.goal ?? '')
    this.advisoryEpi.controls["menAttended"].setValue(trackLoad.advisoryEpi.menAttended ?? 0)
    this.advisoryEpi.controls["objective"].setValue(trackLoad.advisoryEpi.objective ?? '')
    this.advisoryEpi.controls["participantName"].setValue(trackLoad.advisoryEpi.participantName ?? '')
    this.advisoryEpi.controls["participantPosition"].setValue(trackLoad.advisoryEpi.participantPosition ?? '')
    this.advisoryEpi.controls["place"].setValue(trackLoad.advisoryEpi.place ?? '')
    this.advisoryEpi.controls["reportDate"].setValue(trackLoad.advisoryEpi.reportDate ?? '')
    this.advisoryEpi.controls["sectorization"].setValue(trackLoad.advisoryEpi.sectorization ?? '')
    this.advisoryEpi.controls["specialist"].setValue(trackLoad.advisoryEpi.specialist ?? '')
    this.advisoryEpi.controls["subSectorization"].setValue(trackLoad.advisoryEpi.subSectorization ?? '')
    this.advisoryEpi.controls["womenAttended"].setValue(trackLoad.advisoryEpi.womenAttended ?? 0)

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
    console.log("🚀 ~ file: track-epi.component.ts:65 ~ TrackEpiComponent ~ doc:", this.advisoryEpi.controls.doc)


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

      if (!this.isEditForm) {

        this.checkProjectService.addTrack(NEW_TRACK, this.project.id)
          .subscribe(project => {
            const findTrack = project.tracking.find(trackProject => trackProject.advisoryEpi.action == NEW_TRACK.advisoryEpi.action && trackProject.advisoryEpi.devAdv == NEW_TRACK.advisoryEpi.devAdv)
            if (findTrack) {
              console.log("🚀 ~ file: track-epi.component.ts:260 ~ TrackEpiComponent ~ onSubmit ~ findTrack:", findTrack)
              this.uploadService.uploadFile(NEW_TRACK.advisoryEpi.doc.files[0], 'advEpi', findTrack.advisoryEpi.id).then((res) => {
                console.log("🚀 ~ file: track-epi.component.ts:266 ~ TrackEpiComponent ~ this.uploadService.uploadFile ~ res:", res)
              })

            }
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
      else {
        NEW_TRACK.id = this.trackToEdit.id
        NEW_TRACK.projectId = this.trackToEdit.projectId
        NEW_TRACK.advisoryEpi.id = this.trackToEdit.advisoryEpi.id
        NEW_TRACK.advisoryEpi.trackId = this.trackToEdit.advisoryEpi.trackId
        this.checkProjectService.editTrack(NEW_TRACK, this.project.id)
          .subscribe(project => {
            console.log("🚀 ~ file: track-document.component.ts:328 ~ TrackDocumentComponent ~ onSubmit ~ project:", project)

            // this.checkProjectStore.dispatch(SET_TRACKING({ tracking: project.tracking }))
            // this.checkProjectStore.dispatch(SET_EDIT_PROJECT({ checkProject: project }))

          })

        this.stepper.reset()
        this.advisoryEpi.reset()
        this.checkProjectStore.dispatch(CLOSE_DRAWER2())
      }
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
