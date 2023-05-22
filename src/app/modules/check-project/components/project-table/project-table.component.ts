import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { IProject } from 'src/app/core/models/seguimiento/project';
import { OPEN_DRAWER1 } from 'src/app/core/store/actions';
import {
  READ_CHECK_PROJECTS,
  SET_PROJECT,
} from '../../store/actions/checkProject.actions';
import { CheckProjectStore } from '../../store/reducers/checkProject.reducer';
import { IFiltroCheckProjects } from 'src/app/core/models/adicionales';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss'],
})
export class ProjectTableComponent implements OnInit, OnDestroy {
  @Input('component') component: string = 'NEW_PROJECT';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<IProject>([]);
  displayedColumns = [
    'correlative',
    'nameProject',
    'ministry',
    'departament',
    'munic',
    'advance',
    'actions',
  ];
  checkProjectSubscription = new Subscription();

  filtros: IFiltroCheckProjects = {
    isMinistry: false,
    status: 'REGISTER',
  };

  constructor(public checkProjectStore: Store<CheckProjectStore>) {}

  ngOnInit(): void {
    this.checkProjectSubscription = this.checkProjectStore
      .select('checkProject')
      .subscribe((state) => {

        if (this.filtros.isMinistry != state.isMinistry) {
          this.filtros = {
            ...this.filtros,
            isMinistry: state.isMinistry,
          };
          this.checkProjectStore.dispatch(
            READ_CHECK_PROJECTS({
              filtros: this.filtros,
            })
          );
          console.log(this.filtros);
        }

        this.dataSource = new MatTableDataSource<IProject>([...state.projects]);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        });
      });

    if (this.component === 'PROJECT_LIST') {
      this.filtros = {
        ...this.filtros,
        status: 'REGISTER',
      };
    }

    if (this.component === 'PROJECT_FINISHED') {
      this.filtros = {
        ...this.filtros,
        status: 'FINISHED',
      };
    }

    console.log(this.filtros);

    setTimeout(() => {
      this.checkProjectStore.dispatch(
        READ_CHECK_PROJECTS({ filtros: this.filtros })
      );
    }, 100);
  }

  ngOnDestroy(): void {
    this.checkProjectSubscription?.unsubscribe();
  }

  openDrawer1(width1: string, component1: string, checkProject: IProject) {
    this.checkProjectStore.dispatch(SET_PROJECT({ checkProject }));
    this.checkProjectStore.dispatch(OPEN_DRAWER1({ width1, component1 }));
  }
}
