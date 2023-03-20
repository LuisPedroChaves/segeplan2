import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// material components
import { MatSidenavModule } from '@angular/material/sidenav';
// npm modules
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { FlexLayoutModule } from '@angular/flex-layout';


// FullCalendarModule.registerPlugins([ // register FullCalendar plugins
//   dayGridPlugin,
//   interactionPlugin
// ]);



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // material components
    MatSidenavModule,
    // npm modules
    FullCalendarModule,
    SimplebarAngularModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    FlexLayoutModule,
  ],
  exports: [
    // material components
    MatSidenavModule,
    // npm modules
    FullCalendarModule,
    SimplebarAngularModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }
