import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// material components
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

// npm modules
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { SimplebarAngularModule } from 'simplebar-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialFileInputModule } from 'ngx-material-file-input';
/* #region  Configuración de fechas */
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import 'moment/locale/es';
import { getSpanishPaginatorIntl } from './spanish-paginator-intl';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ShowForRolesDirective } from './directives/show-for-roles.directive';
// Tambien hay que instalar MOMENT JS
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
/* #endregion */


// FullCalendarModule.registerPlugins([ // register FullCalendar plugins
//   dayGridPlugin,
//   interactionPlugin
// ]);

@NgModule({
  declarations: [
    NotFoundComponent,
    ShowForRolesDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // material components
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatStepperModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatDialogModule,
    MatExpansionModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRadioModule,
    MatAutocompleteModule,
    // npm modules
    FullCalendarModule,
    SimplebarAngularModule,
    FlexLayoutModule,
    MaterialFileInputModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // material components
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatStepperModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatDialogModule,
    MatExpansionModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRadioModule,
    MatAutocompleteModule,
    // npm modules
    FullCalendarModule,
    SimplebarAngularModule,
    FlexLayoutModule,
    MaterialFileInputModule,
    // components
    NotFoundComponent,
    // directives
    ShowForRolesDirective
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
  ]
})
export class SharedModule { }
