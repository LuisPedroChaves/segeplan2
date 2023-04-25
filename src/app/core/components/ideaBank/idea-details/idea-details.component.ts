import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/adicionales';
import { IdeaAlternative } from 'src/app/core/models/alternative';
import { GeneralInformation } from 'src/app/core/models/informationGeneral';
import { ConvertService } from 'src/app/core/services/convert.service';
import { CLOSE_DRAWER1, OPEN_DRAWER2 } from 'src/app/core/store/actions';
import { AppState } from 'src/app/core/store/app.reducer';
import { IdeaService } from 'src/app/modules/idea-bank/services/idea.service';
import { SET_ALTERNATIVE, UPDATE_CREATED_IDEA, UPDATE_SEND_IDEA } from 'src/app/modules/idea-bank/store/actions';
import { IdeaStore } from 'src/app/modules/idea-bank/store/reducers';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-idea-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './idea-details.component.html',
  styleUrls: ['./idea-details.component.scss']
})
export class IdeaDetailsComponent implements OnInit, OnDestroy {


  ideaStoreSubscription = new Subscription();
  currentIdea: GeneralInformation = null;
  alternatives: IdeaAlternative[] = [];

  sessionSubscription: Subscription;
  usuario: User;

  displayedColumns = ['preliminaryName', 'estimateBeneficiaries', 'estimatedCost', 'investmentCost', 'complexity', 'state', 'actions'];
  dataSource = new MatTableDataSource<IdeaAlternative>([]);

  constructor(
    public dialog: MatDialog,
    private ideaService: IdeaService,
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

  ngOnDestroy(): void {
      this.ideaStoreSubscription?.unsubscribe()
      this.sessionSubscription?.unsubscribe()
  }

  closeDrawer1(): void {
    this.ideaStore.dispatch(CLOSE_DRAWER1())
  }

  openDrawer2(width2: string, component2: string, alternative: IdeaAlternative): void {
    this.ideaStore.dispatch(SET_ALTERNATIVE({ alternative: alternative ? alternative : null }))
    this.ideaStore.dispatch(OPEN_DRAWER2({ width2, component2 }))
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

    this.ideaService.getAlternatives(this.currentIdea.codigo)
      .subscribe(data => {
        this.alternatives = data
        if (data?.length <= 0) {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '250px',
            data: { title: 'No se puede enviar la Idea', description: 'Para Enviar la idea, es necesario crear al menos una alternativa' }
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
          });
          return;
        }
        else {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '250px',
            data: { title: 'Enviar Idea', description: '¿Esta seguro que desea enviar la idea?', confirmation: true }
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            if (result === true) {
              this.currentIdea = {
                ...this.currentIdea,
                state: 'ENVIADA'
              }
              this.ideaStore.dispatch(UPDATE_CREATED_IDEA({ idea: this.currentIdea }))
              this.ideaStore.dispatch(CLOSE_DRAWER1())
            }
            else {
              return;
            }
          });


        }
      });
  }

  finishIdea(): void {

    let alternativesPending = this.currentIdea.alternatives.find((alternative: IdeaAlternative) => alternative.state == 'CREADA');

    if (this.currentIdea.result === 'PENDIENTE') {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '250px',
        data: { title: 'No se puede finalizar el analisis', description: 'Es necesario iniciar con el analisis antes de finalizar', confimation: false }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      });
      return;
    } else if (alternativesPending) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '250px',
        data: { title: 'No se puede finalizar el analisis', description: 'Es necesario que califique todas las alternativas para finalizar el analisis, ', confirmation: false }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      });
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { title: 'Crear Idea', description: '¿Esta seguro que desea guardar los datos para crear una idea?', confirmation: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result === true) {
        // Code of Work
        this.currentIdea = {
          ...this.currentIdea,
          state: 'CALIFICADA'
        }
        this.ideaStore.dispatch(UPDATE_SEND_IDEA({ idea: this.currentIdea }))
        this.ideaStore.dispatch(CLOSE_DRAWER1())
      } else {
        return;
      }
    });
  }
}
