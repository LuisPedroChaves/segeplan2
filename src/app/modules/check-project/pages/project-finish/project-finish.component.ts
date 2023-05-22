import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Departament, IFiltroCheckProjects } from 'src/app/core/models/adicionales';
import { Entity } from 'src/app/core/models/sinafip';
import { READ_GEOGRAFICOS } from 'src/app/modules/check-project/store/actions';
import { GeograficoStore } from 'src/app/modules/check-project/store/reducers';
import { READ_ENTITIES } from 'src/app/modules/check-project/store/actions';
import { EntityStore } from 'src/app/modules/check-project/store/reducers/entity.reducer';
import { CheckProjectStore } from '../../store/reducers/checkProject.reducer';
import { READ_CHECK_PROJECTS } from '../../store/actions';


@Component({
  selector: 'app-project-finish',
  templateUrl: './project-finish.component.html',
  styleUrls: ['./project-finish.component.scss']
})
export class ProjectFinishComponent implements OnInit{

  isMinistry = false;
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
    isMinistry: false,
    status: 'FINISHED',
  }

  months = [
    { value: 1, name: 'Enero' }, { value: 2, name: 'Febrero' }, { value: 3, name: 'Marzo' },
    { value: 4, name: 'Abril' }, { value: 5, name: 'Mayo' }, { value: 6, name: 'Junio' },
    { value: 7, name: 'Julio' }, { value: 8, name: 'Agosto' }, { value: 9, name: 'Septiembre' },
    { value: 10, name: 'Octubre' }, { value: 11, name: 'Noviembre' }, { value: 12, name: 'Diciembre' }
  ]

  constructor(
    public checkProjectStore: Store<CheckProjectStore>,
    private geograficoStore: Store<GeograficoStore>,
    private entityStore: Store<EntityStore>,
  ) { }

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
      })
      this.entityStore.dispatch(READ_ENTITIES());
  }

  selecDepartament(): void {
    // window.alert('Opción aun no habilitada')
    let dptoSelect = this.departamentoFilter.value;
    this.municipioFilter.reset();
    let dpto = this.departamentos.find((dto: Departament) => dto.NOMBRE == dptoSelect);
    if (dpto) { this.municipios = dpto.municipios }
  }

  searchProjects() {
    const newfiltros = {
      isMinistry: false,
      status: 'FINISHED',
    }
    this.filtros = newfiltros;
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
      isMinistry: false,
      status: 'FINISHED',
    }
    this.checkProjectStore.dispatch(READ_CHECK_PROJECTS({ filtros: this.filtros }))
  }

}
