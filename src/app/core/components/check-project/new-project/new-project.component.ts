import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { CheckProjectStore, EntityStore, GeograficoStore } from 'src/app/modules/check-project/store/reducers';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CLOSE_DRAWER1, OPEN_DRAWER2, READ_GEOGRAFICOS } from 'src/app/core/store/actions';
import { Departament } from 'src/app/core/models/adicionales';
import { Entity } from 'src/app/core/models/sinafip';
import { IProject, ITrack } from 'src/app/core/models/seguimiento';
import { CREATE_CHECK_PROJECT, READ_ENTITIES } from 'src/app/modules/check-project/store/actions';

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent  implements OnInit, OnDestroy{

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['iapa', 'iapb', 'iapc', 'activity', 'reportDate', 'actions'];
  dataSource = new MatTableDataSource<ITrack>([])

  departamentos: Departament[] = [];
  municipios: Departament[] = [];
  departamentoStoreSubscription = new Subscription();

  entities: Entity[] = [];
  entityStoreSubscription = new Subscription();

  checkProjectSubscription = new Subscription();
  project: IProject = null;
  isMinistry = false;

  newProject = new FormGroup({
    process: new FormControl(null, Validators.required),
    sector: new FormControl(null, Validators.required),
    nameProject: new FormControl(null, Validators.required),
    departament: new FormControl(null, Validators.required),
    municipality: new FormControl(null, Validators.required),
    observations: new FormControl(null, Validators.required),
    agripManage: new FormControl(false, Validators.required),
    legalLand: new FormControl(false, Validators.required),
    snipCode: new FormControl(null),
    ministry: new FormControl(null),
  })

  process = [
    {value: 1, name: 'CONSTRUCCIÓN'}, {value: 2, name: 'MEJORAMIENTO'},
    {value: 3, name: 'AMPLIACIÓN'}, {value: 4, name: 'REPOSICIÓN'},
    {value: 5, name: 'OTRA'}
  ]

  constructor(
    public checkProjectStore: Store<CheckProjectStore>,
    private geograficoStore: Store<GeograficoStore>,
    private dialog: MatDialog,
    private entityStore: Store<EntityStore>,

  ) { }

  ngOnInit(): void {
    this.departamentoStoreSubscription = this.geograficoStore.select('geografico')
      .subscribe(state => {
        this.departamentos = state.geograficos;
      })
    this.geograficoStore.dispatch(READ_GEOGRAFICOS());

    this.checkProjectSubscription = this.checkProjectStore.select('checkProject')
      .subscribe(state => {
        this.isMinistry = state.isMinistry

        if (state.project) {
          this.setProject(state.project)
        } else {
          this.resetNewProject()
        }
      })

    //LISTADOS
    this.entityStoreSubscription = this.entityStore.select('entity')
      .subscribe(state => {
        this.entities = state.entities;
      })
      this.entityStore.dispatch(READ_ENTITIES())
  }

  ngOnDestroy(): void {
    this.departamentoStoreSubscription?.unsubscribe()
    this.checkProjectSubscription?.unsubscribe()
  }

  setProject(project: IProject): void {
    this.project = project

    this.newProject.controls['process'].setValue(project.process)
    this.newProject.controls['sector'].setValue(project.sector)
    this.newProject.controls['nameProject'].setValue(project.nameProject)
    this.newProject.controls['departament'].setValue(project.depto)
    this.newProject.controls['municipality'].setValue(project.munic)
    this.newProject.controls['observations'].setValue(project.observations)
    this.newProject.controls['agripManage'].setValue(Boolean(project.agripManage))
    this.newProject.controls['legalLand'].setValue(Boolean(project.legalLand))
    this.newProject.controls['snipCode'].setValue(project.snipCode)
    this.newProject.controls['ministry'].setValue(project.ministry)

    setTimeout(() => {
      this.selecDepartament()
    }, 500);
    this.dataSource = new MatTableDataSource<ITrack>(this.project.tracking)
  }

  closeDrawer1() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '375px',
      data: { title: 'Cambios no guardados', description: '¿Seguro que quiere salir? Hay cambios sin guardar. Si abandona la página, los cambios se perderán.', confirmation: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.checkProjectStore.dispatch(CLOSE_DRAWER1())
      } return
    });
  }

  openDrawer2(width2: string, component2: string, track: ITrack) {
    this.checkProjectStore.dispatch(OPEN_DRAWER2({ width2, component2 }))
  }

  selecDepartament(): void {
    // window.alert('Opción aun no habilitada')
    let dptoSelect = this.newProject.controls['departament'].value;
    let dpto = this.departamentos.find((dto: Departament) => dto.NOMBRE == dptoSelect);
    if (dpto) { this.municipios = dpto.municipios }
  }

  resetNewProject(): void {
    this.newProject.reset({
      agripManage: false,
      legalLand: false
    })
    this.project = null
    this.dataSource = new MatTableDataSource<ITrack>([])
  }

  saveTrack() {
    if (this.newProject.invalid) {
      return;
    }

    const {
      process,
      sector,
      nameProject,
      departament,
      municipality,
      observations,
      agripManage,
      legalLand,
      snipCode, ministry } = this.newProject.value;

    if (!this.project) {

      this.project = {
        process,
        sector,
        nameProject,
        isMinistry: this.isMinistry,
        depto: departament,
        munic: municipality,
        observations,
        agripManage,
        legalLand,
        snipCode,
        ministry
      }

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '250px',
        data: { title: 'Registrar proyecto', description: '¿Esta Seguro que desea registrar los datos del Proyecto?', confirmation: true }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {

          this.checkProjectStore.dispatch(CREATE_CHECK_PROJECT({ checkProject: this.project }))
          this.checkProjectStore.dispatch(CLOSE_DRAWER1())
          this.resetNewProject()

        } else {
          return;
        }
      });

      return
    }

    this.project = {
      ...this.project,
      process,
      sector,
      nameProject,
      depto: departament,
      munic: municipality,
      observations,
      agripManage,
      legalLand,
      snipCode
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { title: 'Actualizar proyecto', description: '¿Esta Seguro que desea actualizar los datos del Proyecto?', confirmation: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.checkProjectStore.dispatch(CREATE_CHECK_PROJECT({ checkProject: this.project }))
        this.checkProjectStore.dispatch(CLOSE_DRAWER1())
        this.resetNewProject()

      } else {
        return;
      }
    });
  }

}
