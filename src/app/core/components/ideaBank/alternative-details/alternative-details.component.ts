import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/adicionales';
import { IdeaAlternative } from 'src/app/core/models/alternative';
import { GeneralInformation } from 'src/app/core/models/informationGeneral';
import { ConvertService } from 'src/app/core/services/convert.service';
import { CLOSE_DRAWER2, OPEN_DRAWER2 } from 'src/app/core/store/actions';
import { AppState } from 'src/app/core/store/app.reducer';
import { SET_ALTERNATIVE } from 'src/app/modules/idea-bank/store/actions';
import { AlternativeStore, IdeaStore } from 'src/app/modules/idea-bank/store/reducers';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-alternative-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './alternative-details.component.html',
  styleUrls: ['./alternative-details.component.scss']
})
export class AlternativeDetailsComponent implements OnInit, OnDestroy {

  styles = {
    header: {
      fontSize: 18,
      bold: true
    },
    subheader: {
      fontSize: 15,
      bold: true
    },
    quote: {
      italics: true
    },
    small: {
      fontSize: 8
    },
    cellHeader: { fillColor: '#D6D6D6', bold: true }
  };

  ideaStoreSubscription = new Subscription();
  currentIdea: GeneralInformation = null;

  alternativeStoreSubscription = new Subscription()
  currentAlternative: IdeaAlternative = null!;

  sessionSubscription: Subscription;
  usuario: User;

  constructor(
    private alternativeStore: Store<AlternativeStore>,
    public store: Store<AppState>,
    private ideaStore: Store<IdeaStore>,
  ) { }

  ngOnInit(): void {
    this.sessionSubscription = this.store.select('session').subscribe(session => {
      this.usuario = session.session.usuario;
    });


    this.ideaStoreSubscription = this.ideaStore.select('idea')
      .subscribe(state => {
        this.currentIdea = state.idea;
        console.log(this.currentIdea);
      })

    this.alternativeStoreSubscription = this.alternativeStore.select('alternative')
      .subscribe(state => {
        this.currentAlternative = state.alternative
        console.log(this.currentAlternative);
      });
  }

  ngOnDestroy(): void {
    this.alternativeStoreSubscription?.unsubscribe()
    this.ideaStoreSubscription?.unsubscribe()
  }

  closeDrawer2(): void {
    this.ideaStore.dispatch(CLOSE_DRAWER2())
  }

  openDrawer2(width2: string, component2: string, alternative: IdeaAlternative): void {
    this.ideaStore.dispatch(SET_ALTERNATIVE({ alternative }))
    this.ideaStore.dispatch(OPEN_DRAWER2({ width2, component2 }))
  }

  printReport(): void {

    if (this.currentAlternative.qualification.result == 'PERTINENTE') {
      let print = ConvertService.createIdeaReportPertinenceAndPreinvestment(this.currentIdea, this.currentAlternative);
    }
    else {
      let printf = ConvertService.createIdeaReportPertinence(this.currentIdea, this.currentAlternative);
    }
  }

}
