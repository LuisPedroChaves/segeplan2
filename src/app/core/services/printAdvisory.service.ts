import { Injectable } from '@angular/core';
import PdfPrinter from 'pdfmake';
// Importaciones de Impresion
import { TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ConvertService } from './convert.service';
import { IComment, ITrack } from '../models/seguimiento';

// Register the fonts




const fonts: TFontDictionary = {
  Roboto: {
    normal: './assets/fonts/Roboto-Regular.ttf',
    bold: './assets/fonts/Roboto-Medium.ttf',
    italics: './assets/fonts/Roboto-Italic.ttf',
    bolditalics: './assets/fonts/Roboto-MediumItalic.ttf'
  }
};


@Injectable({
  providedIn: 'root'
})
export class PrintAdvisoryService {
  styles = {
    header: {
      fontSize: 18,
      bold: true
    },
    subheader: {
      fontSize: 15,
      bold: true
    },
    quote: {
      italics: true
    },
    small: {
      fontSize: 8
    },
    cellHeader: { fillColor: '#D6D6D6', bold: true }
  };
  constructor() { }


  async advisoryDocument(isEpi: boolean, track: ITrack) {
    // playground requires you to assign document definition to a variable called dd
    let imageLogo = await ConvertService.getBase64ImageFromURL('assets/img/background.jpg');
    let tableComments: string[][] = []

    if (track.advisoryDoc.comments.length > 0) {
      track.advisoryDoc.comments.forEach((comment: IComment) => {
        const cm = [
          `${comment.theme}`, `${comment.description}`
        ]
        tableComments.push(cm)
      })
    }

    const rowsGeneral = this.returnFirstTable(isEpi, track);


    const advisoryDocument: any = {
      pageSize: { width: 612, height: 792 },
      background: [
        {
          image: imageLogo,
          width: 612,
          height: 792
        }
      ],
      pageMargins: [70, 120, 72, 72], // Margen superior, derecho, inferior, izquierdo en unidades de PDF (72 unidades = 1 pulgada)
      content: [
        {
          text: 'Informe de asesoria técnica',
          fontSize: 15, bold: true, alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          table: {
            widths: [80, '*'],
            body: rowsGeneral
          }
        },
        {
          text: 'Descripción de la actividad',
          fontSize: 15, bold: true, alignment: 'center',
          margin: [20, 20, 0, 20]
        },
        {
          table: {
            body: tableComments
          }
        },
        {
          text: '',
          fontSize: 15, bold: true, alignment: 'center',
          margin: [20, 20, 0, 20]
        },
        {
          table: {
            margin: [0, 20, 50, 90],
            body: [
              [
                {
                  text: 'Conclusiones',
                  bold: true
                },
                {
                  text: `${track.advisoryDoc.conclusions}`
                },
              ],
              [
                {
                  text: 'Recomendaciones',
                  bold: true
                },
                {
                  text: `${track.advisoryDoc.recomend}`
                },
              ],
            ]
          }
        },
      ],

    }

    const print = pdfMake.createPdf(advisoryDocument, null, null, pdfFonts.pdfMake.vfs).open();


  }

  returnFirstTable(isEpi: boolean, track: ITrack) {
    const rowsGeneral = [
      [
        {
          text: 'Meta POA',
          bold: true
        },
        {
          text: `${track.advisoryDoc.goal}`
        },
      ],
      [
        {
          text: 'Acción POA',
          bold: true
        },
        {
          text: `${track.advisoryDoc.action}`
        },
      ],
      [
        {
          text: 'Sectorización del Sector Público',
          bold: true
        },
        {
          text: `${track.advisoryDoc.sectorization}`
        },
      ],
      [
        {
          text: 'Entidad',
          bold: true
        },
        {
          text: `${track.advisoryDoc.subSectorization ?? ''}`
        },
      ],
      [
        {
          text: 'Dirección unidad especifica',
          bold: true
        },
        {
          text: `${track.advisoryDoc.unitSpecific}`
        },
      ],
      [
        {
          text: 'Tema',
          bold: true
        },
        {
          text: `${track.advisoryDoc.advTheme}`
        },
      ],
      [
        {
          text: 'Nombre del Proyecto',
          bold: true
        },
        {
          text: `${track.advisoryDoc.projectName}`
        },
      ],
      [
        {
          text: 'Contacto de la Entidad',
          bold: true
        },
        {
          text: `${track.advisoryDoc.participant ?? ''}`
        },
      ],
      [
        {
          text: 'Cantidad de Personas atendidas',
          bold: true
        },
        {
          text: `Hombres: ${track.advisoryDoc.menAttended}, Mujeres: ${track.advisoryDoc.womenAttended}, Total: ${track.advisoryDoc.totalAttended}`
        },
      ],
      [
        {
          text: 'Fecha de Actividad',
          bold: true
        },
        {
          text: `${track.advisoryDoc.analysisDate ? ConvertService.convertDateToShow(track.advisoryDoc.analysisDate) : ''}`
        },
      ],
      [
        {
          text: 'Fecha de Informe',
          bold: true
        },
        {
          text: `${track.advisoryDoc.advDate ? ConvertService.convertDateToShow(track.advisoryDoc.advDate) : ''}`
        },
      ],
      [
        {
          text: 'Modalidad de la Asesoria',
          bold: true
        },
        {
          text: `${track.advisoryDoc.counselingModality}`
        },
      ],
      [
        {
          text: 'Atendido por:',
          bold: true
        },
        {
          text: `${track.advisoryDoc.assistant}`
        },
      ],
    ]

    const epiRows = [
      [
        {
          text: 'Entidad',
          bold: true
        },
        {
          text: `${track.advisoryDoc.subSectorization ?? ''}`
        },
      ],
      [
        {
          text: 'Dirección unidad especifica',
          bold: true
        },
        {
          text: `${track.advisoryDoc.unitSpecific}`
        },
      ],
      [
        {
          text: 'Tema',
          bold: true
        },
        {
          text: `${track.advisoryDoc.advTheme}`
        },
      ],
      [
        {
          text: 'Nombre del Proyecto',
          bold: true
        },
        {
          text: `${track.advisoryDoc.projectName}`
        },
      ],
    ]

    if (isEpi){
      return epiRows
    }
    return rowsGeneral

  }





  
  async advisoryEpi(isEpi: boolean, track: ITrack) {
    console.log("🚀 ~ file: printAdvisory.service.ts:310 ~ PrintAdvisoryService ~ advisoryEpi ~ isEpi:", isEpi)
    // playground requires you to assign document definition to a variable called dd
    let imageLogo = await ConvertService.getBase64ImageFromURL('assets/img/background.jpg');


    const rowsGeneral = this.returnFirstTableEPI(isEpi, track);


    const advisoryDocument: any = {
      pageSize: { width: 612, height: 792 },
      background: [
        {
          image: imageLogo,
          width: 612,
          height: 792
        }
      ],
      pageMargins: [70, 120, 72, 72], // Margen superior, derecho, inferior, izquierdo en unidades de PDF (72 unidades = 1 pulgada)
      content: [
        {
          text: 'Informe de asesoria técnica',
          fontSize: 15, bold: true, alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          table: {
            widths: [80, '*'],
            body: rowsGeneral
          }
        },
        {
          text: 'Desarrollo de la Actividad',
          fontSize: 15, bold: true, alignment: 'center',
          margin: [20, 20, 0, 20]
        },
        {
          text: '',
          fontSize: 15, bold: true, alignment: 'center',
          margin: [20, 20, 0, 20]
        },
        {
          table: {
            margin: [0, 20, 50, 90],
            body: [
              [
                {
                  text: 'Objetivo',
                  bold: true
                },
                {
                  text: `${track.advisoryEpi.objective}`
                },
              ],
              [
                {
                  text: 'Desarrollo de la Asesoria',
                  bold: true
                },
                {
                  text: `${track.advisoryEpi.devAdv}`
                },
              ],
              [
                {
                  text: 'Conclusiones y recomendaciones',
                  bold: true
                },
                {
                  text: `${track.advisoryEpi.conclusions ?? ''}`
                },
              ],
              [
                {
                  text: 'Compromisos',
                  bold: true
                },
                {
                  text: `${track.advisoryEpi.commitments ?? ''}`
                },
              ],
              [
                {
                  text: 'Especialista de Preinversion',
                  bold: true
                },
                {
                  text: `${track.advisoryEpi.specialist ?? ''}`
                },
              ],
            ]
          }
        },
        {
          table: {
            widths: ['50%', '50%'], // Columnas proporcionales para que la línea de firma esté alineada con el nombre de firma
            body: [
              [
                { text: '___________________________', fontSize: 12, border: [false, false, false, true] },
                // { text: '___________________________', fontSize: 12, border: [false, false, false, true] }
              ],
              [
                { text: 'Especialista de Preinversión', fontSize: 12, border: [false, false, false, true] },
                // { text: 'Firma del Vendedor:', fontSize: 12, border: [false, false, false, true] },
              ],
              [
                { text: 'Dirección de Preinversión', fontSize: 12, border: [false, false, false, true] },
                // { text: 'Firma del Vendedor:', fontSize: 12, border: [false, false, false, true] },
              ],
            ],
          },
          layout: 'noBorders', // Para ocultar los bordes de la tabla y solo mostrar la línea de firma
          margin: [0, 90, 0, 0],

        },
      ],

    }

    const print = pdfMake.createPdf(advisoryDocument, null, null, pdfFonts.pdfMake.vfs).open();


  }

  returnFirstTableEPI(isEpi: boolean, track: ITrack) {
    const rowsGeneral = [
      [
        {
          text: 'Meta POA',
          bold: true
        },
        {
          text: `${track.advisoryEpi.goal}`
        },
      ],
      [
        {
          text: 'Acción',
          bold: true
        },
        {
          text: `${track.advisoryEpi.action}`
        },
      ],
      [
        {
          text: 'Sectorización del Sector Público',
          bold: true
        },
        {
          text: `${track.advisoryEpi.sectorization}`
        },
      ],
      [
        {
          text: 'Entidad',
          bold: true
        },
        {
          text: `${track.advisoryEpi.subSectorization ?? ''}`
        },
      ],
      [
        {
          text: 'Dirección unidad especifica',
          bold: true
        },
        {
          text: `${track.advisoryEpi.unitSpecific}`
        },
      ],
      [
        {
          text: 'Tema',
          bold: true
        },
        {
          text: `${track.advisoryEpi.advTheme}`
        },
      ],
      [
        {
          text: 'Contacto de la Entidad',
          bold: true
        },
        {
          text: `${track.advisoryEpi.participantName} / ${track.advisoryEpi.participantPosition}`
        },
      ],
      [
        {
          text: 'Fecha de Actividad',
          bold: true
        },
        {
          text: `${track.advisoryEpi.advDate ? ConvertService.convertDateToShow(track.advisoryEpi.advDate) : ''}`
        },
      ],
      [
        {
          text: 'Fecha de Informe',
          bold: true
        },
        {
          text: `${track.advisoryEpi.reportDate ? ConvertService.convertDateToShow(track.advisoryEpi.reportDate) : ''}`
        },
      ],
      [
        {
          text: 'Modalidad de la Asesoria',
          bold: true
        },
        {
          text: `${track.advisoryEpi.counselingModality}`
        },
      ],
      [
        {
          text: 'Cantidad de Personas atendidas',
          bold: true
        },
        {
          text: `Hombres: ${track.advisoryEpi.menAttended}, Mujeres: ${track.advisoryEpi.womenAttended}, Total: ${track.advisoryEpi.totalAttended}`
        },
      ],
    ]

    const epiRows = [

      [
        {
          text: 'Sectorización del Sector Público',
          bold: true
        },
        {
          text: `${track.advisoryEpi.sectorization}`
        },
      ],
      [
        {
          text: 'Entidad',
          bold: true
        },
        {
          text: `${track.advisoryEpi.subSectorization ?? ''}`
        },
      ],
      [
        {
          text: 'Dirección unidad especifica',
          bold: true
        },
        {
          text: `${track.advisoryEpi.unitSpecific}`
        },
      ],
      [
        {
          text: 'Tema',
          bold: true
        },
        {
          text: `${track.advisoryEpi.advTheme}`
        },
      ],
      [
        {
          text: 'Contacto de la Entidad',
          bold: true
        },
        {
          text: `${track.advisoryEpi.participantName} / ${track.advisoryEpi.participantPosition}`
        },
      ],
      [
        {
          text: 'Fecha de Actividad',
          bold: true
        },
        {
          text: `${track.advisoryEpi.advDate ? ConvertService.convertDateToShow(track.advisoryEpi.advDate) : ''}`
        },
      ],
      [
        {
          text: 'Fecha de Informe',
          bold: true
        },
        {
          text: `${track.advisoryEpi.reportDate ? ConvertService.convertDateToShow(track.advisoryEpi.reportDate) : ''}`
        },
      ],
      [
        {
          text: 'Modalidad de la Asesoria',
          bold: true
        },
        {
          text: `${track.advisoryEpi.counselingModality}`
        },
      ],
    ]

    if (isEpi){
      return epiRows
    }
    return rowsGeneral

  }

}
