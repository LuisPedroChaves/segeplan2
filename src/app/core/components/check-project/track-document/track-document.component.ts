import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

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
    iapa: new FormControl(2, Validators.required),
    iapb: new FormControl(2, Validators.required),
    iapc: new FormControl(2, Validators.required),
    reportDate: new FormControl(moment(), Validators.required),
  })

  advisoryDoc = new FormGroup({
    goal: new FormControl(''),
    action: new FormControl(''),
    entity: new FormControl(''),
    sectorization: new FormControl(''),
    subSectorization: new FormControl(''),
    advTheme: new FormControl('', [Validators.maxLength(200)]),
    snipCode: new FormControl(''),
    projectName: new FormControl(''),
    participant: new FormControl(''),
    analysisDate: new FormControl(''),
    advDate: new FormControl(''),
    assistant: new FormControl(''),
    conclusions: new FormControl('', [Validators.maxLength(400)]),
    recomend: new FormControl('', [Validators.maxLength(400)]),
  })

  comments: IComment[] = []
  theme = new FormControl('')
  description = new FormControl('', [Validators.maxLength(200)])
  themeDoc = [
    {value: 1, name: 'Diagnóstico'},
    {value: 2, name: 'Identificación del proyecto'},
    {value: 3, name: 'Estudio de mercado'},
    {value: 4, name: 'Estudio técnico'},
    {value: 5, name: 'Análisis ambiental (transversal)'},
    {value: 6, name: 'Análisis de riesgo ante desastres naturales (transversal)'},
    {value: 7, name: 'Estudio administrativo'},
    {value: 8, name: 'Estudio legal'},
    {value: 9, name: 'Estudio y evaluación financiera de proyectos de inversión pública'},
  ]

  checkProjectSubscription = new Subscription();
  entities: Entity[] = [];
  entityStoreSubscription = new Subscription();
  sectors: ISectorAdvised[] = [];
  sectosStoreSubscription = new Subscription();
  subSectors : IsbSector[] = [];
  isDisableSubSectorControl: boolean = true;
  currentActivity: string;
  project: IProject = null;
  sessionSubscription: Subscription;
  usuario: User;

  constructor(
    private entityStore: Store<EntityStore>,
    private checkProjectService: ChekProjectService,
    private checkProjectStore: Store<CheckProjectStore>,
    private sectorStore: Store<SectorAdvisedStore>,
    public dialog: MatDialog,
    public store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.advisoryDoc.controls.subSectorization.disable();

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
          this.currentActivity = state.track.activity
        }
      })
  }

  ngOnDestroy(): void {
    this.entityStoreSubscription?.unsubscribe()
    this.checkProjectSubscription?.unsubscribe()
  }

  sectorSelected(event: MatSelectChange): void {
    let SSECTOR: ISectorAdvised = this.sectors.find((sector:ISectorAdvised) => sector.name == event.value);
    if (SSECTOR.subSectorizations && SSECTOR.subSectorizations.length>0) {
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
        entity,
        advTheme,
        snipCode,
        projectName,
        participant,
        analysisDate,
        advDate,
        assistant,
        conclusions,
        recomend,
        comments: this.comments
      }

      NEW_TRACK.advisoryDoc = { ...NEW_ADVISORY_DOC }


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
    }
  }
}
