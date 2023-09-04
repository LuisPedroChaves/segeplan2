import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Departament, IFiltroCheckProjects } from '../../../../core/models/adicionales';
import { Entity } from '../../../../core/models/sinafip';
import { CheckProjectStore, EntityStore, GeograficoStore } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { CHANGE_IS_MINISTRY, READ_CHECK_PROJECTS, READ_ENTITIES, READ_GEOGRAFICOS } from '../../store/actions';
import { IProject } from '../../../../core/models/seguimiento';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  single: any[] = [];
  single2: any[] = [];
  sectorCount: any[] = [];
  advanceSector: any[] = [];



  typeFollow = new FormControl('true');

  checkProjectSubscription = new Subscription();

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
    isMinistry: true,
    status: 'REGISTER',
  }

  isMinistryState = true;

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
  ) {
    Object.assign(this, { single: this.single });
  }


  ngOnInit(): void {

    this.departamentoStoreSubscription = this.geograficoStore.select('geografico')
      .subscribe(state => {
        this.departamentos = state.geograficos;
      })
    this.geograficoStore.dispatch(READ_GEOGRAFICOS());

    //LISTADOS
    this.entityStoreSubscription = this.entityStore.select('entity')
      .subscribe(state => {
        this.entities = state.entities;
        console.log("🚀 ~ file: dashboard.component.ts:93 ~ DashboardComponent ~ ngOnInit ~ this.entities:", this.entities)
      })
    this.entityStore.dispatch(READ_ENTITIES());

    this.checkProjectSubscription = this.checkProjectStore
      .select('checkProject')
      .subscribe((state) => {
        this.projects = [...state.projects];

        //Functions to Charts
        this.countDataEntities()
        this.countAdvanceMiddle()
        this.countSectorProjects()
        this.countAdvanceBySector()

        console.log("🚀 ~ file: dashboard.component.ts:100 ~ DashboardComponent ~ .subscribe ~ this.projects:", this.projects)
      });

    this.searchProjects();
  }











  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }







  countAdvanceBySector() {
    // Crear objetos para almacenar el avance total y la cantidad de proyectos por sector
    const avanceTotalPorSector: any = {};
    const cantidadProyectosPorSector: any = {};

    // Recorrer los proyectos y acumular avance y contar proyectos por sector
    this.projects.forEach(proyecto => {
      const sector = proyecto.sector;
      const avance = proyecto.advance;

      if (avanceTotalPorSector[sector]) {
        avanceTotalPorSector[sector] += avance;
        cantidadProyectosPorSector[sector]++;
      } else {
        avanceTotalPorSector[sector] = avance;
        cantidadProyectosPorSector[sector] = 1;
      }
    });

    // Calcular el promedio de avance por sector y almacenar en el formato deseado
    const promedioAvancePorSector: any = {};
    Object.keys(avanceTotalPorSector).forEach(sector => {
      const avanceTotal = avanceTotalPorSector[sector];
      const cantidadProyectos = cantidadProyectosPorSector[sector];
      const promedioAvance = avanceTotal / cantidadProyectos;

      promedioAvancePorSector[sector] = promedioAvance;
    });

    // Convertir el resultado en el formato deseado
    const results = Object.keys(promedioAvancePorSector).map(sector => {
      return {
        "name": sector,
        "value": promedioAvancePorSector[sector]
      };
    });

    this.advanceSector = results;
    // Imprimir el resultado en el formato deseado
    console.log(results);
  }



  countDataEntities(): void {
    if (!this.isMinistryState) {
      return;
    }
    const conteoProyectosPorEntidad: any = {};

    // Recorrer los proyectos y contar por entidad
    this.projects.forEach(proyecto => {
      const entidadName = proyecto.ministry;
      console.log("🚀 ~ file: dashboard.component.ts:146 ~ DashboardComponent ~ countDataEntities ~ entidadName:", entidadName)

      if (conteoProyectosPorEntidad[entidadName]) {
        conteoProyectosPorEntidad[entidadName]++;
      } else {
        conteoProyectosPorEntidad[entidadName] = 1;
      }
    });

    // Imprimir el resultado
    console.log({ conteoProyectosPorEntidad });
    // Convertir el resultado en el formato deseado
    const results = Object.keys(conteoProyectosPorEntidad).map(entidadName => {
      return {
        "name": entidadName,
        "value": conteoProyectosPorEntidad[entidadName]
      };
    });
    this.single = [...results]
    console.log({ results });

  }

  countAdvanceMiddle() {
    // if (!this.isMinistryState) {
    //   return;
    // }
    // Crear objetos para almacenar el avance total y la cantidad de proyectos por entidad
    const avanceTotalPorEntidad: any = {};
    const cantidadProyectosPorEntidad: any = {};

    // Recorrer los proyectos y acumular avance y contar proyectos por entidad
    this.projects.forEach(proyecto => {
      const entidadName = proyecto.depto;
      const avance = proyecto.advance;

      if (avanceTotalPorEntidad[entidadName]) {
        avanceTotalPorEntidad[entidadName] += avance;
        cantidadProyectosPorEntidad[entidadName]++;
      } else {
        avanceTotalPorEntidad[entidadName] = avance;
        cantidadProyectosPorEntidad[entidadName] = 1;
      }
    });

    // Calcular el avance promedio por entidad y almacenar en el formato deseado
    const avancePromedioPorEntidad: any = {};
    Object.keys(avanceTotalPorEntidad).forEach(entidadName => {
      const avanceTotal = avanceTotalPorEntidad[entidadName];
      const cantidadProyectos = cantidadProyectosPorEntidad[entidadName];
      const avancePromedio = avanceTotal / cantidadProyectos;

      avancePromedioPorEntidad[entidadName] = avancePromedio;
    });

    // Convertir el resultado en el formato deseado
    const results = Object.keys(avancePromedioPorEntidad).map(entidadName => {
      return {
        "name": entidadName,
        "value": avancePromedioPorEntidad[entidadName]
      };
    });

    this.single2 = results

    // Imprimir el resultado en el formato deseado
    console.log(results);
  }


  countSectorProjects() {
    const cantidadProyectosPorSector: any = {};

    // Recorrer los proyectos y contar por sector
    this.projects.forEach(proyecto => {
      const sector = proyecto.sector;

      if (cantidadProyectosPorSector[sector]) {
        cantidadProyectosPorSector[sector]++;
      } else {
        cantidadProyectosPorSector[sector] = 1;
      }
    });

    // Convertir el resultado en el formato deseado
    const results = Object.keys(cantidadProyectosPorSector).map(sector => {
      return {
        "name": sector,
        "value": cantidadProyectosPorSector[sector]
      };
    });
    this.sectorCount = results;

    // Imprimir el resultado en el formato deseado
    console.log(results);
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

  selecDepartament(): void {
    // window.alert('Opción aun no habilitada')
    let dptoSelect = this.departamentoFilter.value;
    this.municipioFilter.reset();
    let dpto = this.departamentos.find((dto: Departament) => dto.NOMBRE == dptoSelect);
    if (dpto) { this.municipios = dpto.municipios }
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
}
