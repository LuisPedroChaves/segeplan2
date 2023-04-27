import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { FiltroIdeas, User } from 'src/app/core/models/adicionales';
import { IdeaAlternative } from 'src/app/core/models/alternative';
import { GeneralInformation } from 'src/app/core/models/informationGeneral';
import { IdeaStore } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { READ_DONE_IDEAS, SET_IDEA } from '../../store/actions';
import { OPEN_DRAWER1 } from 'src/app/core/store/actions';
import { ConvertService } from 'src/app/core/services/convert.service';

@Component({
  selector: 'app-done-ideas',
  templateUrl: './done-ideas.component.html',
  styleUrls: ['./done-ideas.component.scss']
})
export class DoneIdeasComponent implements OnInit {

  filtro: FiltroIdeas;
  state = 'CALIFICADA';
  author = 'TODOS';
  number = '';
  unitExecute = '';

  constructor(
    private ideaStore: Store<IdeaStore>,
  ) { }

  ngOnInit(): void {

    this.ideaStore.dispatch(READ_DONE_IDEAS({ filtro: { state: this.state } }))
  }

  sendFilter(): void {

    this.filtro = { state: this.state };
    if (this.author != 'TODOS') {
      this.filtro.author = this.author;
    }
    if (this.number && this.number != '') {
      this.filtro.number = this.number;
    }
    if (this.unitExecute && this.unitExecute != '') {
      this.filtro.executionUnit = this.unitExecute;
    }
    this.ideaStore.dispatch(READ_DONE_IDEAS({ filtro: this.filtro }))
  }
}
