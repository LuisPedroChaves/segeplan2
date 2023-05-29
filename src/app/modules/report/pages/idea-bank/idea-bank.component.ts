import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { XlsxService } from 'src/app/core/services/xlsx.service';
import { Departament, IObject, IProduct, Procesos, Process } from '../../../../core/models/adicionales';
import { Observable, Subscription } from 'rxjs';
import { GeograficoStore, IdeaStore, ObjectStore, ProcesoStore } from '../../../idea-bank/store/reducers';
import { Store } from '@ngrx/store';
import { FiltroIdeaReport } from '../../models/filterToReport';
import { ReportService } from '../../services/report.service';
import { IInstitution } from '../../models/Institucion';
import { READ_PRODUCTS } from '../../../../core/store/actions';

@Component({
  selector: 'app-idea-bank',
  templateUrl: './idea-bank.component.html',
  styleUrls: ['./idea-bank.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class IdeaBankComponent implements OnInit {

  filtroReport: FiltroIdeaReport;

  /* #region catálogos */

  departamentos: Departament[] = [];
  municipios: Departament[] = [];
  departamentoStoreSubscription = new Subscription();

  objetos: IObject[] = [];
  objetoStoreSubscription = new Subscription();

  processes: Procesos = { noFormaCapital: [], formaCapital: [] };
  processStoreSubscription = new Subscription();

  dataSourceProcesos: Process[] = [];
  /* #endregion */



  yearCreated = '';
  idEntity = '';
  state = 'TODAS';
  registerCode = '';
  productName = '';
  typeIdea = 'TODAS';
  proccess = '';
  object = '';
  departament = '';
  municipality = '';
  projectType = '';
  formulationProcess = '';
  complexity = '';
  foundingSourcesName = '';
  estimatedCostMin = '';
  estimatedCostMax = '';
  investmentCostMin = '';
  investmentCostMax = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['Idea', 'Producto', 'Institucion', 'Problematica'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: any | null;
  data: any[] = []
  dataSource = new MatTableDataSource<any>()


  productIsDisabled = true;
  processIsDisabled = true;
  objectIsDisabled = true;
  municipioIsDisabled = true;

  institutions: IInstitution[] = [];

  products: IProduct[] = [];
  filteredProducts: Observable<IProduct[]>;
  productStoreSubscription = new Subscription();

  constructor(
    private geograficoStore: Store<GeograficoStore>,
    private objectStore: Store<ObjectStore>,
    private procesoStore: Store<ProcesoStore>,
    private xlsxService: XlsxService,
    private dialog: MatDialog,
    private reportService: ReportService,
    private ideaStore: Store<IdeaStore>,

  ) { }

  ngOnInit(): void {

    this.departamentoStoreSubscription = this.geograficoStore.select('geografico')
      .subscribe(state => {
        this.departamentos = state.geograficos;
        console.log("🚀 ~ file: idea-bank.component.ts:91 ~ IdeaBankComponent ~ ngOnInit ~ this.departamentos:", this.departamentos)
      })
    this.objetoStoreSubscription = this.objectStore.select('object')
      .subscribe(state => {
        this.objetos = state.objects;
        console.log("🚀 ~ file: idea-bank.component.ts:98 ~ IdeaBankComponent ~ ngOnInit ~ objetos:", this.objetos)
      })


    this.processStoreSubscription = this.procesoStore.select('proceso')
      .subscribe(state => {
        this.processes = state.procesos;
        this.dataSourceProcesos = this.processes.formaCapital;

      })

    this.getInstituciones()

    setTimeout(() => this.dataSource.paginator = this.paginator)
  }

  ngOnDestroy(): void {
    this.departamentoStoreSubscription?.unsubscribe()
    this.objetoStoreSubscription?.unsubscribe()
    this.processStoreSubscription?.unsubscribe()
  }

  getInstituciones() {
    this.reportService.getInstitutions().subscribe((res: any) => {
      console.log(res);
      this.institutions = res
    })
  }

  enableTypeProject(): void {
    const TYPE = this.typeIdea

    if (TYPE === 'Forma Capital Fijo') {
      this.dataSourceProcesos = this.processes.formaCapital
      console.log("🚀 ~ file: idea-bank.component.ts:119 ~ IdeaBankComponent ~ enableTypeProject ~ this.dataSourceProcesos:", this.dataSourceProcesos)
      return
    }
    this.dataSourceProcesos = this.processes.noFormaCapital
    this.processIsDisabled = false
    console.log("🚀 ~ file: idea-bank.component.ts:123 ~ IdeaBankComponent ~ enableTypeProject ~ this.dataSourceProcesos:", this.dataSourceProcesos)
  }

  filterProduct(idEntity: string): void {
    if (idEntity != '') {

      this.productStoreSubscription = this.ideaStore.select('product')
        .subscribe(state => {
          this.products = state.products;
          if (this.products.length > 0) {
            this.productIsDisabled = false
          } else {
            this.productIsDisabled = true;
          }
        })
      this.ideaStore.dispatch(READ_PRODUCTS({ filtro: idEntity }))
      console.log("🚀 ~ file: idea-bank.component.ts:163 ~ IdeaBankComponent ~ filterProduct ~ this.productIsDisabled:", this.productIsDisabled)
    }

  }

  sendFilter(): void {

    this.filtroReport = { state: this.state };
    if (this.yearCreated && this.yearCreated != '') {
      this.filtroReport.yearCreated = this.yearCreated
    }
    if (this.idEntity && this.idEntity != '') {
      this.filtroReport.idEntity = this.idEntity;
    }
    if (this.registerCode && this.registerCode != '') {
      this.filtroReport.registerCode = this.registerCode;
    }

    const result = this.reportService.getIdeasReport(this.filtroReport).subscribe((res: any) => {
      if (res) {
        console.log("🚀 ~ file: idea-bank.component.ts:146 ~ IdeaBankComponent ~ result ~ res:", res)
        this.data = res;
        this.dataSource = new MatTableDataSource<any>(this.data)

      }
    })


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
        'Idea',
        'Producto',
        'Institución',
        'Problemática',
      ],
    ];

    const rowFree: any[] = [];

    const rowHead: any[] = [
      'Idea',
      'Producto',
      'Institución',
      'Problemática'
    ];


    const ArrayToPrint: any[] = [];

    this.data.forEach((c) => {

      const row: any[] = [
        c.registerCode,
        c.productName,
        c.nameEntity,
        c.baseLine,
      ];


      const row2: any[] = [
        'Tipo de Idea',
        'Proceso',
        'Objeto',
        'Departamento',
        'Municipio',
        'Entidad Responsable',
        'Poblacion de Referencia',
        'Genero',
        'Denominacion',
        'Tipo de Proyecto',
        'Complejidad',
        'Costo de la Preinversion',
        'Costo de la Inversion',
        'Plazo de Preinversion',
        'Fecha Inicio Ejecucion',
        'Fecha Fin Ejecucion',
        'Etapa Sugerida',
        'Total Obtenido',

      ];

      ArrayToPrint.push(row);
      ArrayToPrint.push(rowFree);
      ArrayToPrint.push(row2);

      c.alternatives.forEach((alter: any) => {
        const rowAlter: any[] = [
          alter.typeProject,
          alter.proccess,
          alter.object,
          alter.departament,
          alter.municipality,
          alter.nameEPI,
          alter.referencePop,
          `${alter.type} con ${alter.total}, y ${alter.type2} con ${alter.total2}`,
          alter.denomination,
          alter.typeProjectFormulation,
          alter.complexity,
          alter.estimatedCost,
          alter.investmentCost,
          alter.foundingSourcesName,
          `${alter.executionDateMonth}/20${alter.executionDateYear}`,
          `${alter.finishDateMonth}/20${alter.finishDateYear}`,
          alter.etapaValor,
          alter.etapaResultado,
        ];
        ArrayToPrint.push(rowAlter);
      })
      ArrayToPrint.push(rowFree);
      ArrayToPrint.push(rowFree);
      ArrayToPrint.push(rowHead);

    });

    ArrayToPrint.forEach((row) => body.push(row));

    this.xlsxService.downloadSinglePage(
      body,
      `Reporte de ejemplo`,
      `Reporte de ejemplo`,
    );

  }

}
