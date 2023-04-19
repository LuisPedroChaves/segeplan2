import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/adicionales';
import { IdeaAlternative } from 'src/app/core/models/alternative';
import { GeneralInformation } from 'src/app/core/models/informationGeneral';
import { ConvertService } from 'src/app/core/services/convert.service';
import { AppState } from 'src/app/core/store/app.reducer';
import { IdeaService } from 'src/app/modules/idea-bank/services/idea.service';
import { UPDATE_CREATED_IDEA, UPDATE_SEND_IDEA } from 'src/app/modules/idea-bank/store/actions';
import { IdeaStore } from 'src/app/modules/idea-bank/store/reducers';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-idea-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './idea-details.component.html',
  styleUrls: ['./idea-details.component.scss']
})
export class IdeaDetailsComponent {
closeDrawer1() {
throw new Error('Method not implemented.');
}
openDrawer2() {
throw new Error('Method not implemented.');
}
sendFilter() {
throw new Error('Method not implemented.');
}
author: any;
state: any;
number: any;

alternatives: any[] = [
  {
    preliminaryName: {
      typeProject: 'Proyecto 1...',
      proccess: 'Process...',
      object: 'Object...'
    },
    projectDescription: {
      complexity: 'Alto...'
    }
  }
];

ideaStoreSubscription = new Subscription();
currentIdea: GeneralInformation = null;

sessionSubscription: Subscription;
usuario: User;

displayedColumns = ['preliminaryName', 'estimateBeneficiaries', 'estimatedCost', 'investmentCost', 'complexity', 'state', 'actions'];
dataSource = new MatTableDataSource<IdeaAlternative>([]);

constructor(
  public dialog: MatDialog,
  private _generalInformationService: IdeaService,
  public store: Store<AppState>,
  private ideaStore: Store<IdeaStore>,
) { }

ngOnInit(): void {

  this.ideaStoreSubscription = this.ideaStore.select('idea')
    .subscribe(state => {
      this.currentIdea = state.idea;
      this.dataSource = new MatTableDataSource<IdeaAlternative>(this.currentIdea.alternatives);
    })

  this.sessionSubscription = this.store.select('session').subscribe(session => {
    this.usuario = session.session.usuario;
  });
}

openFullDrawer(fullTitle: string, fullComponent: string): void {
  this.ideaStore.dispatch(OPEN_FULL_DRAWER({ fullTitle, fullComponent }))
}

openFullDrawer2(fullTitle2: string, fullComponent2: string, alternative: IdeaAlternative): void {
  this.ideaStore.dispatch(SET_ALTERNATIVE({ alternative: alternative ? alternative : null }))
  this.ideaStore.dispatch(OPEN_FULL_DRAWER2({ fullTitle2, fullComponent2 }))
}

printReport(alternative: any): void {

  if (alternative.qualification.result == 'PERTINENTE') {
    let print = ConvertService.createIdeaReportPertinenceAndPreinvestment(this.currentIdea, alternative);
  }
  else {
    let printf = ConvertService.createIdeaReportPertinence(this.currentIdea, alternative);
  }
}

sendIdea(): void {

  // this.generalInformationService.getAlternatives(this.currentIdea.codigo)
  //   .subscribe(data => {
  //     this.alternatives = data
  //     if (data?.length <= 0) {
  //       const dialogRef = this.dialog.open(AlertDialogComponent, {
  //         width: '250px',
  //         data: { title: 'No se puede enviar la Idea', description: 'Para Enviar la idea, es necesario crear al menos una alternativa' }
  //       });

  //       dialogRef.afterClosed().subscribe(result => {
  //         console.log('The dialog was closed', result);
  //       });
  //       return;
  //     }
  //     else {
  //       const dialogRef = this.dialog.open(AlertDialogComponent, {
  //         width: '250px',
  //         data: { title: 'Enviar Idea', description: '¿Esta seguro que desea enviar la idea?', confirmation: true }
  //       });

  //       dialogRef.afterClosed().subscribe(result => {
  //         console.log('The dialog was closed', result);
  //         if (result === true) {
  //           this.currentIdea = {
  //             ...this.currentIdea,
  //             state: 'ENVIADA'
  //           }
  //           this.ideaStore.dispatch(UPDATE_CREATED_IDEA({ idea: this.currentIdea }))
  //           this.ideaStore.dispatch(CLOSE_FULL_DRAWER())
  //         }
  //         else {
  //           return;
  //         }
  //       });


  //     }
  //   });
}

finishIdea(): void {

  // let alternativesPending = this.currentIdea.alternatives.find((alternative: IdeaAlternative) => alternative.state == 'CREADA');

  // if (this.currentIdea.result === 'PENDIENTE') {
  //   const dialogRef = this.dialog.open(AlertDialogComponent, {
  //     width: '250px',
  //     data: { title: 'No se puede finalizar el analisis', description: 'Es necesario iniciar con el analisis antes de finalizar', confimation: false }
  //   });

  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     console.log('The dialog was closed', result);
  //   });
  //   return;
  // } else if (alternativesPending) {
  //   const dialogRef = this.dialog.open(AlertDialogComponent, {
  //     width: '250px',
  //     data: { title: 'No se puede finalizar el analisis', description: 'Es necesario que califique todas las alternativas para finalizar el analisis, ', confirmation: false }
  //   });

  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     console.log('The dialog was closed', result);
  //   });
  //   return;
  // }

  // const dialogRef = this.dialog.open(AlertDialogComponent, {
  //   width: '250px',
  //   data: { title: 'Crear Idea', description: '¿Esta seguro que desea guardar los datos para crear una idea?', confirmation: true }
  // });

  // dialogRef.afterClosed().subscribe((result: boolean) => {
  //   console.log('The dialog was closed', result);
  //   if (result === true) {
  //     // Code of Work
  //     this.currentIdea = {
  //       ...this.currentIdea,
  //       state: 'CALIFICADA'
  //     }
  //     this.ideaStore.dispatch(UPDATE_SEND_IDEA({ idea: this.currentIdea }))
  //     this.ideaStore.dispatch(CLOSE_FULL_DRAWER())
  //   } else {
  //     return;
  //   }
  // });
}
}
function CLOSE_FULL_DRAWER(): any {
  throw new Error('Function not implemented.');
}

function OPEN_FULL_DRAWER2(arg0: { fullTitle2: string; fullComponent2: string; }): any {
  throw new Error('Function not implemented.');
}

function SET_ALTERNATIVE(arg0: { alternative: IdeaAlternative; }): any {
  throw new Error('Function not implemented.');
}

function OPEN_FULL_DRAWER(arg0: { fullTitle: string; fullComponent: string; }): any {
  throw new Error('Function not implemented.');
}
