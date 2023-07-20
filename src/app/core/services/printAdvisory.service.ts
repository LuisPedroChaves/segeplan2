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


  async advisoryDocument(track: ITrack) {
    // playground requires you to assign document definition to a variable called dd
    let imageLogo = await ConvertService.getBase64ImageFromURL('assets/img/background.jpg');
    console.log("🚀 ~ file: printAdvisory.service.ts:57 ~ PrintAdvisoryService ~ advisoryDocument ~ imageLogo:", imageLogo)
    let tableComments: string[][] = []

    if (track.advisoryDoc.comments.length > 0){
      track.advisoryDoc.comments.forEach((comment: IComment) => {
        const cm = [
          `${comment.theme}`, `${comment.description}`
        ]
        tableComments.push(cm)
      })
    }



    const advisoryDocument: any =  {
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
          text: 'Informe de Asesoria',
          fontSize: 15, bold: true, alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          table: {
            widths: [80, '*'],
            body: [
              [
                {
                  text: 'META POA',
                  bold: true
                },
                {
                  text: `${track.advisoryDoc.goal}`
                },
              ],
              [
                {
                  text: 'Accion POA',
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
                  text: 'Contacto de la Entidad',
                  bold: true
                },
                {
                  text: `${track.advisoryDoc.participant}`
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
                  text: `${track.advisoryDoc.analysisDate}`
                },
              ],
              [
                {
                  text: 'Fecha de Informe',
                  bold: true
                },
                {
                  text: `${track.advisoryDoc.advDate}`
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
              [
                {
                  text: 'Observaciones:',
                  bold: true
                },
                {
                  table: {
                    body: tableComments
                  },
                }
              ],
            ]
          }
        },
      ],

    }


    {
      table: {
        body: [
          ['Col1', 'Col2'],
          ['1', '2', ],
          ['1', '2', ]
        ]
      }
    }

    const print = pdfMake.createPdf(advisoryDocument,null,null,pdfFonts.pdfMake.vfs).open();


  }

}
