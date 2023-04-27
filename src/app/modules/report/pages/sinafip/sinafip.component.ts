import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { XlsxService } from 'src/app/core/services/xlsx.service';

@Component({
  selector: 'app-sinafip',
  templateUrl: './sinafip.component.html',
  styleUrls: ['./sinafip.component.scss']
})
export class SinafipComponent implements OnInit {

  number = '';
  unitExecute = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['column1', 'column2', 'column3', 'column4', 'column5'];
  dataSource = new MatTableDataSource<any>([
    {
      column1: 'ejemplo',
      column2: 'ejemplo',
      column3: 'ejemplo',
      column4: 'ejemplo',
      column5: 'ejemplo',
    }
  ])
  data: any[] = [
    {
      column1: 'ejemplo',
      column2: 'ejemplo',
      column3: 'ejemplo',
      column4: 'ejemplo',
      column5: 'ejemplo',
    }
  ]

  ngOnInit(): void {
    setTimeout(() => this.dataSource.paginator = this.paginator)
  }

  constructor(
    private xlsxService: XlsxService,
    private dialog: MatDialog
  ) {}

  sendFilter(): void {
    return
  }

  downloadXlsx(): void {

    if (this.data.length === 0) {

      this.dialog.open(ConfirmationDialogComponent, {
        width: '375px',
        data: {
          title: `No hay datos para exportar`,
          description: `No existe información en la tabla para exportar`,
          confirmation: false
        }
      })
      return
    }

    const body = [
      [
        'Columna 1',
        'Columna 2',
        'Columna 3',
        'Columna 4',
        'Columna 5',
      ],
    ];

    const ArrayToPrint: any[] = [];

    this.data.forEach((c) => {

      const row: any[] = [
        c.column1,
        c.column2,
        c.column3,
        c.column4,
        c.column5,
      ];
      ArrayToPrint.push(row);
    });

    ArrayToPrint.forEach((row) => body.push(row));

    this.xlsxService.downloadSinglePage(
      body,
      `Reporte de ejemplo`,
      `Reporte de ejemplo`,
    );

  }
}
