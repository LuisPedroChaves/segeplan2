import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LOGIN } from 'src/app/core/store/actions';
import { AppState } from 'src/app/core/store/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    remember: new FormControl(true),
  })

  sessionSubscription: Subscription;

  constructor(
    public store: Store<AppState>,
    private router: Router,
  ) {
    const REMEMBER = localStorage.getItem('username')
    if (REMEMBER) {
      this.loginForm.controls['username'].setValue(REMEMBER)
    }
  }

  ngOnInit(): void {

    this.sessionSubscription = this.store.select('session').subscribe(session => {

      if (session.session) {
        this.router.navigate(['/']);
      }
    });

  }


  ngOnDestroy() {
    this.sessionSubscription?.unsubscribe();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) { return; }
    const { username, password, remember } = this.loginForm.value;

    if (remember) {
      localStorage.setItem('username', username)
    } else {
      localStorage.removeItem('username')
    }

    this.store.dispatch(LOGIN({ username, password }));
  }

}
