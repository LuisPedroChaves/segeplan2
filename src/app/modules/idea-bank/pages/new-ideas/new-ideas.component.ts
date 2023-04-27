import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FiltroIdeas } from 'src/app/core/models/adicionales';
import { IdeaStore } from '../../store/reducers';
import { READ_IDEAS } from '../../store/actions';

@Component({
  selector: 'app-new-ideas',
  templateUrl: './new-ideas.component.html',
  styleUrls: ['./new-ideas.component.scss'],
})
export class NewIdeasComponent implements OnInit {

  filtro: FiltroIdeas;
  state = 'TODAS';
  author = 'Mis Ideas';
  number = '';
  unitExecute = '';

  constructor(
    private ideaStore: Store<IdeaStore>,
  ) { }

  ngOnInit(): void {

    this.ideaStore.dispatch(READ_IDEAS({ filtro: { state: this.state } }))

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
    this.ideaStore.dispatch(READ_IDEAS({ filtro: this.filtro }))
  }

}
