import { Component, OnInit } from '@angular/core';
import { FiltroIdeas } from 'src/app/core/models/adicionales';
import { IdeaStore } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { READ_SEND_IDEAS } from '../../store/actions';

@Component({
  selector: 'app-send-ideas',
  templateUrl: './send-ideas.component.html',
  styleUrls: ['./send-ideas.component.scss']
})
export class SendIdeasComponent implements OnInit {

  filtro: FiltroIdeas;
  state = 'ENVIADA';
  author = 'Mis Ideas';
  number = '';
  unitExecute = '';

  constructor(
    private ideaStore: Store<IdeaStore>,
  ) { }

  ngOnInit(): void {

    this.ideaStore.dispatch(READ_SEND_IDEAS({ filtro: { state: this.state } }))
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
    this.ideaStore.dispatch(READ_SEND_IDEAS({ filtro: this.filtro }))
  }
}
