import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// npm modules
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';


// FullCalendarModule.registerPlugins([ // register FullCalendar plugins
//   dayGridPlugin,
//   interactionPlugin
// ]);



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // npm modules
    FullCalendarModule,
  ],
  exports: [
    // npm modules
    FullCalendarModule,
  ]
  })
export class SharedModule { }
