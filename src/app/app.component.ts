import { Component, HostBinding, OnInit } from '@angular/core';
import { ThemingService } from './core/services/theming.service';
import { Store } from '@ngrx/store';
import { AppState } from './core/store/app.reducer';
import { SET_SESSION } from './core/store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @HostBinding('class') className = ''

  constructor(
    private themingService: ThemingService,
    private appStore: Store<AppState>
  ) {
    if (localStorage.getItem('segeplan-session') !== null) {
      const SESSION = JSON.parse(localStorage.getItem('segeplan-session'));
      this.appStore.dispatch(SET_SESSION({ session: SESSION }));
    }
  }

  ngOnInit(): void {

    this.themingService.theme.subscribe((theme: string) => {

      this.className = theme;

    });

  }
}
