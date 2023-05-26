import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { IAdmissionConfig } from 'src/app/core/models/sinafip/admissionConfig';
import { MatrixService } from '../../services/matrix.service';

@Component({
  selector: 'app-admition-matrix',
  templateUrl: './admition-matrix.component.html',
  styleUrls: ['./admition-matrix.component.scss']
})
export class AdmitionMatrixComponent {

  admissionValues: IAdmissionConfig;

  matrixValues = new FormGroup({
    statementMaxValue: new FormControl('', Validators.required),
    beneficiariestMaxValue: new FormControl('', Validators.required),
    goalsMaxValue: new FormControl('', Validators.required),
    tdrMaxValue: new FormControl('', Validators.required),
    costMaxValue: new FormControl('', Validators.required),
    scheduleMaxValue: new FormControl('', Validators.required),
  })

  constructor(
    public dialog: MatDialog,
    private matrixService: MatrixService,
  ) {}

  saveMatrix() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { title: 'Guardar Matriz', description: '¿Esta seguro que desea guardar los valores de la matriz?', confirmation: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result === true) {
        this.matrixService.updateAdmition(this.admissionValues).subscribe((res: any) => {
          console.log(res);
          this.matrixValues.reset();
        })
      }
      else {
        return;
      }
    });
  }

}
