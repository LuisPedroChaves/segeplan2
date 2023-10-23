import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatStepper } from '@angular/material/stepper';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
// Importaciones de Impresion
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';
import { GeneralInformation } from 'src/app/core/models/informationGeneral';
import { IdeaAlternative, Qualification, preInvestmentResult } from 'src/app/core/models/alternative';
import { IPertinence } from 'src/app/core/models/adicionales/pertinence';
import { IdeaService } from 'src/app/modules/idea-bank/services/idea.service';
import { Store } from '@ngrx/store';
import { AlternativeStore, IdeaStore } from 'src/app/modules/idea-bank/store/reducers';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { CLOSE_DRAWER2 } from 'src/app/core/store/actions';
import { ConvertService } from 'src/app/core/services/convert.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-new-revelance-matrix',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-revelance-matrix.component.html',
  styleUrls: ['./new-revelance-matrix.component.scss']
})
export class NewRevelanceMatrixComponent implements OnInit, OnDestroy {

  terrainDisabled = false;

  @ViewChild('stepper') stepper: MatStepper;
  ideaStoreSubscription = new Subscription();
  currentIdea: GeneralInformation = null;


  alternativeStoreSubscription = new Subscription()
  currentAlternative: IdeaAlternative = null!;

  relevanceMatrix: Qualification = {};
  preInvestment: preInvestmentResult = null!;

  totalMatrix = 0;

  loading = true;
  loadingPre = false;
  preSend = false;

  criterios = new FormGroup({
    descProblem: new FormControl('', Validators.required),
    descProblemComment: new FormControl(''),
    generalObjct: new FormControl('', Validators.required),
    generalObjctComment: new FormControl(''),
    anlysDelimitation: new FormControl('', Validators.required),
    anlysDelimitationComment: new FormControl(''),
    terrainIdent: new FormControl('', Validators.required),
    terrainIdentComment: new FormControl(''),
    legalSituation: new FormControl('', Validators.required),
    legalSituationComment: new FormControl(''),
    terreno: new FormControl(''),
    descAnlys: new FormControl('', Validators.required),
    descAnlysComment: new FormControl(''),
  })

  resume = new FormGroup({
    descriptionGeneral: new FormControl(''),
  })

  matrix: IPertinence = {
    "criterio1": {
      "baseLine": "índice de analfabetismo =75% para el año 20XX"
    },
    "criterio2": {
      "generalObjective": "Descripción de objetivo general ",
      "expectedChange": "Resultado o cambio esperado respecto a indicadores       (resultado final) "
    },
    "criterio3": {
      "totalPopulation": 1000,
      "gender": null,
      "estimateBeneficiaries": 10,
      "preliminaryCharacterization": "prueba",
      "coverage": 1,
      "referencePopulation": "Nacional",
      "denomination": "Alumnos"
    },
    "criterio4": {
      "availableTerrain": false,
      "oneAvailableTerrain": true,
      "investPurchase": false
    },
    "criterio5": {
      "terrenos": [],
    },
    "criterio6": {
      "projectType": "Proyecto 1",
      "formulationProcess": "proceso de formulario",
      "descriptionInterventions": "string...",
      "complexity": "string"
    }
  }

  ratingGroups: any = [
    {
      name: 'EXCELENTE',
      ratings: [10]
    },
    {
      name: 'BUENO',
      ratings: [9, 8]
    },
    {
      name: 'ACEPTABLE',
      ratings: [7, 6]
    },
    {
      name: 'DEFICIENTE',
      ratings: [5, 4]
    },
    {
      name: 'REPLANTEAR',
      ratings: [3, 2, 1]
    },
  ]

  constructor(private ideaService: IdeaService,
    private alternativeStore: Store<AlternativeStore>,
    private ideaStore: Store<IdeaStore>,
    public dialog: MatDialog,
    private snackbarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.ideaStoreSubscription = this.ideaStore.select('idea')
      .subscribe(state => {
        this.currentIdea = state.idea;
        console.log(this.currentIdea);
      })
    this.alternativeStoreSubscription = this.alternativeStore.select('alternative')
      .subscribe(state => {
        this.currentAlternative = state.alternative
        this.getMatrix();
        if (this.stepper) {
          this.stepper.reset()
        }
      })
  }

  getMatrix(): void {
    this.loading = false;
    this.ideaService.getMatrizPertinencia(this.currentAlternative.codigo).subscribe((res: any) => {
      this.matrix = res;
      console.log(this.matrix)
      console.log(this.matrix.criterio5.terrenos.length);
      if (this.matrix.criterio5.terrenos.length > 0) { this.terrainDisabled = false } else { this.terrainDisabled = true }
    })
  }

  loadMatrix(): void {
    if (this.criterios.invalid) {
      this.snackbarService.show('WARNING', 'Algunos campos son obligatorios', 3000)
      return
    }

    let valProblem = parseInt(this.criterios.value.descProblem, 10) * 2;
    this.relevanceMatrix.descProblem = valProblem;
    this.relevanceMatrix.descProblemComment = this.criterios.value.descProblemComment;
    let valObjGeneral = parseInt(this.criterios.value.generalObjct, 10) * 2;
    this.relevanceMatrix.generalObjct = valObjGeneral;
    this.relevanceMatrix.generalObjctComment = this.criterios.value.generalObjctComment;
    let valDelimit = parseInt(this.criterios.value.anlysDelimitation, 10) * 2;
    this.relevanceMatrix.anlysDelimitation = valDelimit;
    this.relevanceMatrix.anlysDelimitationComment = this.criterios.value.anlysDelimitationComment;
    this.relevanceMatrix.terrainIdent = parseInt(this.criterios.value.terrainIdent, 10);
    this.relevanceMatrix.terrainIdentComment = this.criterios.value.terrainIdentComment;
    this.relevanceMatrix.legalSituation = parseInt(this.criterios.value.legalSituation, 10);
    this.relevanceMatrix.legalSituationComment = this.criterios.value.legalSituationComment;
    this.relevanceMatrix.terreno = this.criterios.value.terreno;

    this.preSend = false;
    console.log(this.criterios.value)
    let rsult = ''
    let valAnlys = parseInt(this.criterios.value.descAnlys, 10) * 2;

    this.totalMatrix = valProblem + valObjGeneral + valDelimit + valAnlys
      + parseInt(this.criterios.value.terrainIdent, 10) + parseInt(this.criterios.value.legalSituation, 10);

    if (this.totalMatrix >= 60) {
      rsult = 'PERTINENTE';
      this.generateMatrixPreinvent();
    } else { rsult = 'NO PERTINENTE' }
    //

    this.relevanceMatrix.AlterId = this.currentAlternative.codigo;

    this.relevanceMatrix.descAnlys = valAnlys;
    this.relevanceMatrix.descAnlysComment = this.criterios.value.descAnlysComment;
    this.relevanceMatrix.total = this.totalMatrix;
    this.relevanceMatrix.result = rsult;


    console.log(
      this.relevanceMatrix
    )
  }

  ngOnDestroy(): void {
    this.alternativeStoreSubscription?.unsubscribe()
  }

  closeDrawer2(): void {
    this.ideaStore.dispatch(CLOSE_DRAWER2())
  }

  generateMatrixPreinvent(): void {
    this.loadingPre = true;
    this.preSend = true;

    this.ideaService.getMatrizPreinversion(this.currentAlternative.codigo).subscribe((res: any) => {
      this.preInvestment = res;
      console.log(res)
      this.loadingPre = false;
    })
  }

  savePertinenceMatrix(): void {

    this.relevanceMatrix.descriptionGeneral = this.resume.value.descriptionGeneral;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { title: 'Guardar Matriz', description: '¿Esta seguro que desea guardar la matriz?', confirmation: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result === true) {
        // Code of Work
        this.ideaService.saveMatrixPertinence(this.relevanceMatrix).subscribe((res: any) => {
          console.log(res);
          this.ideaStore.dispatch(CLOSE_DRAWER2());
          this.stepper.reset();
        })
      }
      else {
        return;
      }
    });
  }


  async printReport(): Promise<void> {
    let imageLogo = await ConvertService.getBase64ImageFromURL('assets/img/Logo-min.jpg');


    let today = moment().format('DD.MM.YYYY');
    let dateArr = today.split('.');
    let monthName = ConvertService.convertMonthToString(parseInt(dateArr[1]));
    let dateToday = `Guatemala, ${dateArr[0]} de ${monthName} de ${dateArr[2]}`

    let dateCreateIdea = moment(this.currentIdea.createdAt).format('DD/MM/YYYY')

    let tableBody: any[] =
      [
        {
          text: 'No.',
          style: 'cellHeader',
          border: [false, false, false, true]
        },
        {
          text: 'Criterios de Pertinencia',
          style: 'cellHeader',
          border: [false, false, false, true]
        },
        {
          text: 'RECOMENDACIONES',
          alignment: 'left',
          style: 'cellHeader',
          border: [false, false, false, true]
        }
      ]

    let rows = []
    let numberI = 0

    if (this.relevanceMatrix.descProblemComment) {
      numberI = numberI + 1;
      let alt = [
        {
          text: numberI,
          border: [false, false, true, false],
        },
        {
          text: 'Descripción de la problemática y el indicador (Línea base)',
          alignment: 'left',
          border: [false, false, false, false],
        },
        {
          text: this.relevanceMatrix.descProblemComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }


    if (this.relevanceMatrix.generalObjctComment) {
      numberI = numberI + 1;
      let alt = [
        {
          text: numberI,
          border: [false, false, true, false],
        },
        {
          text: 'Objetivo General y resultado',
          alignment: 'left',
          border: [false, false, false, false],
        },
        {
          text: this.relevanceMatrix.generalObjctComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }

    if (this.relevanceMatrix.anlysDelimitationComment) {
      numberI = numberI + 1;
      let alt = [
        {
          text: numberI,
          border: [false, false, true, false],
        },
        {
          text: 'Análisis de la delimitación preliminar de beneficiarios.',
          alignment: 'left',
          border: [false, false, false, false],
        },
        {
          text: this.relevanceMatrix.anlysDelimitationComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }


    if (this.relevanceMatrix.terrainIdentComment) {
      numberI = numberI + 1;
      let alt = [
        {
          text: numberI,
          border: [false, false, true, false],
        },
        {
          text: 'Identificación del terreno.',
          alignment: 'left',
          border: [false, false, false, false],
        },
        {
          text: this.relevanceMatrix.terrainIdentComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }


    if (this.relevanceMatrix.legalSituationComment) {
      numberI = numberI + 1;
      let alt = [
        {
          text: numberI,
          border: [false, false, true, false],
        },
        {
          text: 'Situación legal del posible bien inmueble.',
          alignment: 'left',
          border: [false, false, false, false],
        },
        {
          text: this.relevanceMatrix.legalSituationComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }


    if (this.relevanceMatrix.descAnlysComment) {
      numberI = numberI + 1;
      let alt = [
        {
          text: numberI,
          border: [false, false, true, false],
        },
        {
          text: 'Análisis de la descripción de la idea.',
          alignment: 'left',
          border: [false, false, false, false],
        },
        {
          text: this.relevanceMatrix.descAnlysComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }

    if (this.relevanceMatrix.total) {

      let textDesc = this.relevanceMatrix.total.toString();
      (this.relevanceMatrix.descriptionGeneral) ? textDesc = textDesc + ' - ' + this.relevanceMatrix.descriptionGeneral : textDesc;

      let alt = [
        {
          text: '',
          border: [false, false, false, false],
        },
        {
          text: 'TOTAL OBTENIDO.',
          alignment: 'left',
          border: [false, false, false, false],
        },
        {
          text: textDesc,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }


    let resultadoPre = this.preInvestment.etapa.resultado.toUpperCase();
    // this.currentAlternative.qualification.



    const pdfDefinition: any = {
      content: [
        {
          stack: [
            {
              text: dateToday,
              alignment: 'right',
              margin: [0, 0, 0, -35],
            }
          ],
        },
        {
          image: imageLogo,
          width: 150,
          opacity: 0.5,
          margin: [0, 0, 0, 35],
        },
        this.currentAlternative.resEntity.leaderName,
        'Presente\n\n\n\n',
        'Estimado representante de la Secretaria de la Nación:\n\n',
        {
          text: [
            'Deseándoles éxitos en sus labores cotidianas, permítame infórmale con base en la información de la idea registrada en el Banco de Ideas de Proyectos denominada ',
            this.currentAlternative.preName.preliminaryName,
            ' con fecha ', dateCreateIdea, ' y código de registro ',
            this.currentIdea.registerCode, ', su IDEA DE PROYECTO queda en calidad de ', this.relevanceMatrix.result.toUpperCase(), ', lo anterior de acuerdo al análisis de la información consignada.\n\n\n',],
          alignment: 'justify'
        },
        {
          style: 'tableExample',
          table: {
            body: [
              tableBody,
              ...rows
            ]
          },
          alignment: 'center',
          layout: {
            fillColor: function (rowIndex: any, node: any, columnIndex: any) {
              return (rowIndex % 2 === 0) ? '#f2f2f2' : null;
            },
          },
          margin: [40, 0, 40, 35],
        },
        {
          text: [
            '\n\n\n\n\n\n\n\nSe le recomienda que la etapa a la cual debe llegar la idea de proyecto, previo a la etapa de ejecución sea: ',
            resultadoPre + '\n\n\n'
          ],
          alignment: 'justify',
        },
        {
          style: 'tableExample',
          table: {
            body: [
              [
                {
                  text: 'ETAPA SUGERIDA DE PREINVERSIÓN A LA QUE DEBE LLEGAR',
                  style: 'cellHeader',
                  border: [false, false, false, false],
                  colSpan: 2,
                },
                {
                }
              ],
              [
                {
                  text: 'ETAPA SUGERIDA',
                  border: [false, true, true, false],
                },
                {
                  text: resultadoPre,
                  alignment: 'left',
                  border: [false, true, false, false],
                },
              ],
            ]
          },
          alignment: 'center',
          layout: {
            fillColor: function (rowIndex: any, node: any, columnIndex: any) {
              return (rowIndex % 2 === 0) ? '#f2f2f2' : null;
            },
          },
          margin: [70, 0, 40, 35],
        },
        {
          text: '\n\nLa Dirección de Preinversión, queda a la disposición para cualquier para cualquier asesoría que se requiera.',
          alignment: 'justify',
        },
        {
          text: '\n\n\n Atentamente',
          alignment: 'justify',
        },
      ]
    }

    const pdf = pdfMake.createPdf(pdfDefinition, null, null, pdfFonts.pdfMake.vfs);
    pdf.open();

  }
}
