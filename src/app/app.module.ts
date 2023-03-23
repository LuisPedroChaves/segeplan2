import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/env/environment.prod';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { appReducers } from './core/store/app.reducer';
import { effectsArray } from './core/store/effects';
import { AppRoutingModule } from './app-routing.module';
import { NewIdeaComponent } from './core/components/ideaBank/new-idea/new-idea.component';
import { NewDesignationComponent } from './core/components/configs/new-designation/new-designation.component';
import { NewPopulationComponent } from './core/components/configs/new-population/new-population.component';
import { NewFinancingComponent } from './core/components/configs/new-financing/new-financing.component';

@NgModule({
  declarations: [
    AppComponent,
    NewIdeaComponent,
    NewDesignationComponent,
    NewPopulationComponent,
    NewFinancingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    // @ngrx
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(effectsArray),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
