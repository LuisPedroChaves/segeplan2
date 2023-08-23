import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Departament, IFiltroCheckProjects } from '../../../../../../core/models/adicionales';
import { Entity } from '../../../../../../core/models/sinafip';
import { CHANGE_IS_MINISTRY, READ_CHECK_PROJECTS } from '../../../../../check-project/store/actions';
import { CheckProjectStore, EntityStore } from '../../../../../check-project/store/reducers';
import { READ_GEOGRAFICOS } from '../../../../../idea-bank/store/actions';
import { GeograficoStore } from '../../../../../idea-bank/store/reducers';
import { READ_ENTITIES } from '../../../../../sinafip/store/actions';
import { ConfirmationDialogComponent } from '../../../../../../core/components/confirmation-dialog/confirmation-dialog.component';
import { XlsxService } from '../../../../../../core/services/xlsx.service';
import { MatDialog } from '@angular/material/dialog';
import { IProject, ITrack } from '../../../../../../core/models/seguimiento';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {


  checkProjectSubscription = new Subscription();

  typeFollow = new FormControl('false');
  departamentoFilter = new FormControl('');
  municipioFilter = new FormControl('');
  entidadFilter = new FormControl('');
  monthFilter = new FormControl('');

  departamentos: Departament[] = [];
  municipios: Departament[] = [];
  departamentoStoreSubscription = new Subscription();

  entities: Entity[] = [];
  entityStoreSubscription = new Subscription();

  filtros: IFiltroCheckProjects = {
    isMinistry: false,
    status: 'REGISTER',
  }

  isMinistryState = false;

  months = [
    { value: 1, name: 'Enero' }, { value: 2, name: 'Febrero' }, { value: 3, name: 'Marzo' },
    { value: 4, name: 'Abril' }, { value: 5, name: 'Mayo' }, { value: 6, name: 'Junio' },
    { value: 7, name: 'Julio' }, { value: 8, name: 'Agosto' }, { value: 9, name: 'Septiembre' },
    { value: 10, name: 'Octubre' }, { value: 11, name: 'Noviembre' }, { value: 12, name: 'Diciembre' }
  ]

  projects: IProject[] = []

  constructor(
    public checkProjectStore: Store<CheckProjectStore>,
    private geograficoStore: Store<GeograficoStore>,
    private entityStore: Store<EntityStore>,
    private xlsxService: XlsxService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.departamentoStoreSubscription = this.geograficoStore.select('geografico')
      .subscribe(state => {
        this.departamentos = state.geograficos;
      })
    this.geograficoStore.dispatch(READ_GEOGRAFICOS());

    this.checkProjectSubscription = this.checkProjectStore
      .select('checkProject')
      .subscribe((state) => {
        this.projects = [...state.projects];
      });

    //LISTADOS
    this.entityStoreSubscription = this.entityStore.select('entity')
      .subscribe(state => {
        this.entities = state.entities;
      })
    this.entityStore.dispatch(READ_ENTITIES());
    this.checkProjectStore.dispatch(CHANGE_IS_MINISTRY({ isMinistry: this.isMinistryState }))

  }

  selecDepartament(): void {
    // window.alert('Opción aun no habilitada')
    let dptoSelect = this.departamentoFilter.value;
    this.municipioFilter.reset();
    let dpto = this.departamentos.find((dto: Departament) => dto.NOMBRE == dptoSelect);
    if (dpto) { this.municipios = dpto.municipios }
  }

  selecTypeFollow(): void {
    const typeSelected = this.typeFollow.value;
    if (typeSelected == 'true') {
      this.isMinistryState = true;
    } else {
      this.isMinistryState = false;
    }
    this.checkProjectStore.dispatch(CHANGE_IS_MINISTRY({ isMinistry: this.isMinistryState }))
  }

  searchProjects() {

    const newFilter = {
      status: 'REGISTER',
    }
    this.filtros = { ...newFilter, isMinistry: this.isMinistryState }

    if (this.departamentoFilter.value) {
      this.filtros.departamento = this.departamentoFilter.value;
    }
    if (this.municipioFilter.value) {
      this.filtros.municipio = this.municipioFilter.value;
    }
    if (this.entidadFilter.value) {
      this.filtros.entidad = this.entidadFilter.value;
    }
    if (this.monthFilter.value) {
      this.filtros.mes = this.monthFilter.value;
    }
    this.checkProjectStore.dispatch(READ_CHECK_PROJECTS({ filtros: this.filtros }))
  }

  clearControls() {
    this.departamentoFilter.reset();
    this.municipioFilter.reset();
    this.entidadFilter.reset();
    this.monthFilter.reset();

    this.filtros = {
      isMinistry: this.isMinistryState,
      status: 'REGISTER',
    }
    this.checkProjectStore.dispatch(READ_CHECK_PROJECTS({ filtros: this.filtros }))
  }

  downloadXlsx(): void {
    console.log("🚀 ~ file: all-projects.component.ts:64 ~ AllProjectsComponent ~ projects:", this.projects)

    if (this.projects.length === 0) {

      this.dialog.open(ConfirmationDialogComponent, {
        width: '375px',
        data: {
          title: `No hay datos para exportar`,
          description: `No existe información en la tabla para exportar`,
          confirmation: false
        }
      })
      return
    }

    const body = [
      [
        'No.',
        'SNIP',
        'Nombre del Proyecto',
        'Sector',
        'Departamento',
        'Municipio',
        'Actividad Realizada',
        'Sectorizacion del Sector Publico',
        'Nombre de la Entidad',
        'Direccion o Unidad',
        'Tema de la Ultima Actividad Registrada',
        'Hombres Atendidos',
        'Mujeres Atendidas',
        'Fecha de la Actividad',
        'Ultimo Porcentaje de Avance',
        'Conclusiones',
        'Nombre del Especialista',
      ],
    ];

    const ArrayToPrint: any[] = [];

    this.projects.forEach((p: IProject) => {
      if (p.tracking.length > 0) {
        p.tracking.forEach((t: ITrack) => {
          if (t.activity == 'ASESORÍA A LA EPI') {
            const row: any[] = [
              p.correlative,
              p.snipCode,
              p.nameProject,
              p.sector,
              p.depto,
              p.munic,
              t.activity,
              t.advisoryEpi?.sectorization,
              t.advisoryEpi?.subSectorization,
              t.advisoryEpi?.unitSpecific,
              t.advisoryEpi?.advTheme,
              t.advisoryEpi?.menAttended,
              t.advisoryEpi?.womenAttended,
              this.convertToFormattedDate(t.reportDate.toString()),
              p.advance,
              t.advisoryEpi?.conclusions,
              t.advisoryEpi?.specialist
            ]
            ArrayToPrint.push(row);
          } else if (t.activity == 'ASESORÍA AL DOCUMENTO') {
            const row: any[] = [
              p.correlative,
              p.snipCode,
              p.nameProject,
              p.sector,
              p.depto,
              p.munic,
              t.activity,
              t.advisoryDoc?.sectorization,
              t.advisoryDoc?.subSectorization,
              t.advisoryDoc?.unitSpecific,
              t.advisoryDoc?.advTheme,
              t.advisoryDoc?.menAttended,
              t.advisoryDoc?.womenAttended,
              this.convertToFormattedDate(t.reportDate.toString()),
              p.advance,
              t.advisoryDoc?.conclusions,
              t.advisoryDoc?.assistant
            ]
            ArrayToPrint.push(row);
          } else if (t.activity == 'VISITA DE CAMPO') {
            const row: any[] = [
              p.correlative,
              p.snipCode,
              p.nameProject,
              p.sector,
              p.depto,
              p.munic,
              t.activity,
              '',
              '',
              '',
              '',
              '',
              '',
              this.convertToFormattedDate(t.reportDate.toString()),
              p.advance,
              '',
              ''
            ]
            ArrayToPrint.push(row);
          }

        })
      }
    })

    ArrayToPrint.forEach((row) => body.push(row));

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    this.xlsxService.downloadSinglePage(
      body,
      `Proyectos`,
      `Reporte de Proyectos ${year}${month}${day}`,
    );

  }

  convertToFormattedDate(inputDate: string): string {
    const date = new Date(inputDate);
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

}
