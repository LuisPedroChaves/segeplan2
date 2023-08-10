import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { startWith } from 'rxjs/operators';


import { READ_ENTITIES, READ_SECTORSADVISED, SET_EDIT_PROJECT, SET_TRACKING } from 'src/app/modules/check-project/store/actions';
import { CheckProjectStore, EntityStore, SectorAdvisedStore } from 'src/app/modules/check-project/store/reducers';
import { IAdvisoryDoc, IComment, IProject, ITrack } from 'src/app/core/models/seguimiento';
import { ISectorAdvised, IsbSector } from 'src/app/core/models/sinafip/sectorAdvised';
import { ModalGuideComponent } from '../modal-guide/modal-guide.component';
import { ChekProjectService } from 'src/app/modules/check-project/services/chek-project.service';
import { MatSelectChange } from '@angular/material/select';
import { CLOSE_DRAWER2 } from 'src/app/core/store/actions';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatStepper } from '@angular/material/stepper';
import { AppState } from 'src/app/core/store/app.reducer';
import { Entity } from 'src/app/core/models/sinafip';
import { User } from 'src/app/core/models/adicionales';

@Component({
  selector: 'app-track-document',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './track-document.component.html',
  styleUrls: ['./track-document.component.scss']
})
export class TrackDocumentComponent {

  @ViewChild('stepper') stepper: MatStepper
  track = new FormGroup({
    iapa: new FormControl(0, Validators.required),
    iapb: new FormControl(0, Validators.required),
    iapc: new FormControl(0, Validators.required),
    reportDate: new FormControl(moment(), Validators.required),
  })

  isEditForm = false;
  trackToEdit: ITrack;

  advisoryDoc = new FormGroup({
    goal: new FormControl(''),
    action: new FormControl(''),
    entity: new FormControl(''),
    sectorization: new FormControl(''),
    subSectorization: new FormControl(''),
    menAttended: new FormControl(0),
    womenAttended: new FormControl(0),
    counselingModality: new FormControl(''),
    advTheme: new FormControl('', [Validators.maxLength(200)]),
    snipCode: new FormControl(''),
    projectName: new FormControl(''),
    participant: new FormControl(''),
    analysisDate: new FormControl(''),
    advDate: new FormControl(''),
    assistant: new FormControl(''),
    conclusions: new FormControl('', [Validators.maxLength(1000)]),
    recomend: new FormControl('', [Validators.maxLength(1000)]),
  })

  comments: IComment[] = []
  theme = new FormControl('')
  description = new FormControl('', [Validators.maxLength(200)])
  themeDoc = [
    { value: 1, name: 'Diagnóstico' },
    { value: 2, name: 'Identificación del proyecto' },
    { value: 3, name: 'Estudio de mercado' },
    { value: 4, name: 'Estudio técnico' },
    { value: 5, name: 'Análisis ambiental (transversal)' },
    { value: 6, name: 'Análisis de riesgo ante desastres naturales (transversal)' },
    { value: 7, name: 'Estudio administrativo' },
    { value: 8, name: 'Estudio legal' },
    { value: 9, name: 'Estudio y evaluación financiera de proyectos de inversión pública' },
  ]

  checkProjectSubscription = new Subscription();
  entities: Entity[] = [];
  entityStoreSubscription = new Subscription();
  sectors: ISectorAdvised[] = [];
  sectosStoreSubscription = new Subscription();
  subSectors: IsbSector[] = [];
  isDisableSubSectorControl: boolean = true;
  currentActivity: string;
  project: IProject = null;
  sessionSubscription: Subscription;
  usuario: User;

  totalAttended = 0;


  constructor(
    private entityStore: Store<EntityStore>,
    private checkProjectService: ChekProjectService,
    private checkProjectStore: Store<CheckProjectStore>,
    private sectorStore: Store<SectorAdvisedStore>,
    public dialog: MatDialog,
    public store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    // this.advisoryDoc.controls.subSectorization.disable();

    this.sessionSubscription = this.store.select('session').subscribe(session => {
      this.usuario = session.session.usuario;
    });

    this.advisoryDoc.controls.assistant.setValue(this.usuario.name)
    this.advisoryDoc.controls.assistant.disable();

    this.entityStoreSubscription = this.entityStore.select('entity')
      .subscribe(state => {
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
        if (state.project) {
          this.project = state.project
        }
        if (state.track) {
          this.currentActivity = 'ASESORÍA AL DOCUMENTO'
          if (state.track.advisoryDoc) {
            this.isEditForm = true;
            this.loadValuesAdvisory(state.track)
          }
        }
      })

    this.advisoryDoc.valueChanges
      .pipe(startWith(this.advisoryDoc.value))
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
    // this.visitCard.controls["municip"].setValue(state.track.visitCard.municip)

    console.log("🚀 ~ file: track-document.component.ts:154 ~ TrackDocumentComponent ~ loadValuesAdvisory ~ trackLoad:", trackLoad)
    this.track.controls["iapa"].setValue(trackLoad.iapa ?? 0)
    this.track.controls["iapb"].setValue(trackLoad.iapb ?? 0)
    this.track.controls["iapc"].setValue(trackLoad.iapc ?? 0)
    this.track.controls["reportDate"].setValue(moment(trackLoad.reportDate.toString()))

    this.advisoryDoc.controls["action"].setValue(trackLoad.advisoryDoc.action ?? "")
    this.advisoryDoc.controls["advDate"].setValue(trackLoad.advisoryDoc.advDate)
    this.advisoryDoc.controls["advTheme"].setValue(trackLoad.advisoryDoc.advTheme ?? '')
    this.advisoryDoc.controls["analysisDate"].setValue(trackLoad.advisoryDoc.analysisDate)
    this.advisoryDoc.controls["assistant"].setValue(trackLoad.advisoryDoc.assistant ?? '')
    this.advisoryDoc.controls["conclusions"].setValue(trackLoad.advisoryDoc.conclusions ?? '')
    this.advisoryDoc.controls["counselingModality"].setValue(trackLoad.advisoryDoc.counselingModality ?? '')
    this.advisoryDoc.controls["entity"].setValue(trackLoad.advisoryDoc.unitSpecific ?? '')
    this.advisoryDoc.controls["goal"].setValue(trackLoad.advisoryDoc.goal ?? '')
    this.advisoryDoc.controls["menAttended"].setValue(trackLoad.advisoryDoc.menAttended ?? 0)
    this.advisoryDoc.controls["participant"].setValue(trackLoad.advisoryDoc.participant ?? '')
    this.advisoryDoc.controls["projectName"].setValue(trackLoad.advisoryDoc.projectName ?? '')
    this.advisoryDoc.controls["recomend"].setValue(trackLoad.advisoryDoc.recomend ?? '')
    this.advisoryDoc.controls["sectorization"].setValue(trackLoad.advisoryDoc.sectorization ?? '')
    this.advisoryDoc.controls["snipCode"].setValue(trackLoad.advisoryDoc.snipCode ?? '')
    this.advisoryDoc.controls["subSectorization"].setValue(trackLoad.advisoryDoc.subSectorization ?? '')
    this.advisoryDoc.controls["womenAttended"].setValue(trackLoad.advisoryDoc.womenAttended ?? 0)

    if (trackLoad.advisoryDoc.comments.length > 0){
      trackLoad.advisoryDoc.comments.forEach((advComment) => {
        const comment: IComment = {
          theme: advComment.theme,
          description: advComment.description
        }
        this.comments.push(comment)
        this.theme.setValue(null)
        this.description.setValue(null)
      })
    }
    
  }

  ngOnDestroy(): void {
    this.entityStoreSubscription?.unsubscribe()
    this.checkProjectSubscription?.unsubscribe()
  }

  sectorSelected(event: MatSelectChange): void {
    let SSECTOR: ISectorAdvised = this.sectors.find((sector: ISectorAdvised) => sector.name == event.value);
    if (SSECTOR.subSectorizations && SSECTOR.subSectorizations.length > 0) {
      this.subSectors = SSECTOR.subSectorizations;
      this.isDisableSubSectorControl = false;
      this.advisoryDoc.controls.subSectorization.enable();
    } else {
      this.subSectors = []
      this.isDisableSubSectorControl = true;
      this.advisoryDoc.controls.subSectorization.reset();
      this.advisoryDoc.controls.subSectorization.disable();
    }
  }

  addComment(): void {
    const comment: IComment = {
      theme: this.theme.value,
      description: this.description.value
    }
    this.comments.push(comment)
    this.theme.setValue(null)
    this.description.setValue(null)
  }

  removeComment(index: number): void {
    if (index > -1) {
      this.comments.splice(index, 1)
    }
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

    if (this.currentActivity === 'ASESORÍA AL DOCUMENTO') {

      const {
        goal,
        action,
        entity,
        sectorization,
        subSectorization,
        menAttended,
        womenAttended,
        counselingModality,
        advTheme,
        snipCode,
        projectName,
        participant,
        analysisDate,
        advDate,
        assistant,
        conclusions,
        recomend,
      } = this.advisoryDoc.value

      const NEW_ADVISORY_DOC: IAdvisoryDoc = {
        goal,
        action,
        unitSpecific: entity,
        sectorization,
        subSectorization,
        menAttended,
        womenAttended,
        totalAttended: this.totalAttended,
        counselingModality,
        advTheme,
        snipCode,
        projectName,
        participant,
        analysisDate,
        advDate,
        assistant: this.usuario.name,
        conclusions,
        recomend,
        comments: this.comments
      }

      NEW_TRACK.advisoryDoc = { ...NEW_ADVISORY_DOC }

      if (!this.isEditForm){
        this.checkProjectService.addTrack(NEW_TRACK, this.project.id)
          .subscribe(project => {
  
            this.checkProjectStore.dispatch(SET_TRACKING({ tracking: project.tracking }))
            this.checkProjectStore.dispatch(SET_EDIT_PROJECT({ checkProject: project }))
  
          })
  
        this.stepper.reset()
        this.advisoryDoc.reset()
        this.comments = []
        this.checkProjectStore.dispatch(CLOSE_DRAWER2())
  
        return
      } else {
        NEW_TRACK.id = this.trackToEdit.id
        NEW_TRACK.projectId = this.trackToEdit.projectId
        NEW_TRACK.advisoryDoc.id = this.trackToEdit.advisoryDoc.id
        NEW_TRACK.advisoryDoc.trackId = this.trackToEdit.advisoryDoc.trackId
        this.checkProjectService.editTrack(NEW_TRACK, this.project.id)
          .subscribe(project => {
          console.log("🚀 ~ file: track-document.component.ts:328 ~ TrackDocumentComponent ~ onSubmit ~ project:", project)

            // this.checkProjectStore.dispatch(SET_TRACKING({ tracking: project.tracking }))
            // this.checkProjectStore.dispatch(SET_EDIT_PROJECT({ checkProject: project }))

          })

        this.stepper.reset()
        this.advisoryDoc.reset()
        this.comments = []
        this.checkProjectStore.dispatch(CLOSE_DRAWER2())
      }


    }
  }
}
