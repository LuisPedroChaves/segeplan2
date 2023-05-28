import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';

import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { MatrixService } from '../../services/matrix.service';
import { IRevelanceMatrix } from '../../../../core/models/configs/RevelanceMatrix';

@Component({
  selector: 'app-revelance-matrix',
  templateUrl: './revelance-matrix.component.html',
  styleUrls: ['./revelance-matrix.component.scss']
})
export class RevelanceMatrixComponent {

  revelanceValues: IRevelanceMatrix;

  matrixValues = new FormGroup({
    investmentRangeMin: new FormControl('', Validators.required),
    investmentRangeMax: new FormControl('', Validators.required),
    beneficiariesRangeMin: new FormControl('', Validators.required),
    beneficiariesRangeMax: new FormControl('', Validators.required),
    complexyRangeMin: new FormControl('', Validators.required),
    complexyRangeMax: new FormControl('', Validators.required),
    stageRangeMin: new FormControl('', Validators.required),
    stageRangeMax: new FormControl('', Validators.required),
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
        this.matrixService.updateRevelance(this.revelanceValues).subscribe((res: any) => {
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
