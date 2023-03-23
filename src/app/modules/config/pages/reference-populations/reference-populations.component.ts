import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { OPEN_DRAWER1 } from 'src/app/core/store/actions';
import { AppState } from 'src/app/core/store/app.reducer';
@Component({
  selector: 'app-reference-populations',
  templateUrl: './reference-populations.component.html',
  styleUrls: ['./reference-populations.component.scss']
})
export class ReferencePopulationsComponent {
  displayedColumns: string[] = ['image', 'name', 'actions'];
  dataSource = new MatTableDataSource<any>([
    {
      name: 'Alumnos',
    },
    {
      name: 'Pacientes',
    },
    {
      name: 'Agricultores',
    },
    {
      name: 'Maestros',
    },
    {
      name: 'Contadores',
    },
  ]);
  constructor(
    private appStore: Store<AppState>
  ) { }

  openDrawer1(width1: string, component1: string, product: any): void {
    // this.warehouseStore.dispatch(SET_WAREHOUSE({ warehouse }))
    this.appStore.dispatch(OPEN_DRAWER1({ width1, component1 }))
  }
}
