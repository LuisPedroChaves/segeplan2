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

@Component({
  selector: 'app-last-project',
  templateUrl: './last-project.component.html',
  styleUrls: ['./last-project.component.css']
})
export class LastProjectComponent implements OnInit {

 
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
    if (typeSelected == 'true'){
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
    this.filtros = {...newFilter, isMinistry: this.isMinistryState}

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
    console.log("🚀 ~ file: all-projects.component.ts:110 ~ AllProjectsComponent ~ searchProjects ~ this.filtros:", this.filtros)
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
