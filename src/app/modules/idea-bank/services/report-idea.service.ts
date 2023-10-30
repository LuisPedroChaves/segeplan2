import { Injectable } from '@angular/core';
import PdfPrinter from 'pdfmake';
// Importaciones de Impresion
import { TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ConvertService } from '../../../core/services/convert.service';
import { GeneralInformation, PossibleCause, PossibleEffect } from '../../../core/models/informationGeneral';
import { DataGeo, IdeaAlternative } from '../../../core/models/alternative';

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
export class ReportIdeaService {
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


  async reportIdeaPDF(ideaGeneral: GeneralInformation) {
    // playground requires you to assign document definition to a variable called dd
    let imageLogo = await ConvertService.getBase64ImageFromURL('assets/img/SEGEPLAN2023.png');

    const effectsArray = this.getEffects(ideaGeneral.Effects)
    const causesArray = this.getCauses(ideaGeneral.Causes)

    const alternatives = this.getAlternatives(ideaGeneral.alternatives)

    const reportIdea: any = {
      pageSize: { width: 612, height: 792 },
      content: [
        {
          table: {
            widths: ['100%'], // Divide la página en 3 columnas
            margin: [-10, 0, 10, 0], // Márgenes para separar la imagen del texto
            body: [
              [
                {
                  image: imageLogo,
                  width: 240,
                  height: 65,
                  fontSize: 25, alignment: 'center',
                  margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                  border: [true, true, true, true], // Elimina los bordes de la imagen										
                },
              ],
              [
                {
                  fillColor: '#2D3746',
                  text: `BANCO DE IDEAS DE PROYECTOS - BIP -`,
                  lineHeight: 2.5,
                  fontSize: 16, bold: false, color: '#fff', alignment: 'center',
                  margin: [0, 20, 0, 0], // Márgenes para separar la imagen del texto
                  border: [true, true, true, true], // Elimina los bordes de la imagen										
                },
              ],
              [
                {
                  fillColor: '#798DA6',
                  text: `REGISTRO DE "INICIATIVA DE INVERSIÓN" IDEA DE PROYECTO`,
                  fontSize: 10, bold: false, color: '#FEFF00', alignment: 'center',
                  margin: [0, 1, 0, 2], // Márgenes para separar la imagen del texto
                  border: [true, true, true, true], // Elimina los bordes de la imagen										
                },
              ],
              [
                {
                  text: `Objetivo: Obtener información preliminar de la iniciativa de inversión relacionada con el proceso de planificación, como inicio del proceso de preinversión.`,
                  fontSize: 8, bold: false, alignment: 'center',
                  margin: [20, 3, 20, 0], // Márgenes para separar la imagen del texto
                  border: [true, true, true, false], // Elimina los bordes de la imagen										
                },
              ],
              [
                {
                  fillColor: '#B7C5E4',
                  text: `1 \t Información General`,
                  fontSize: 8, bold: false, alignment: 'left',
                  margin: [10, 0, 0, 0], // Márgenes para separar la imagen del texto
                  border: [true, false, true, false], // Elimina los bordes de la imagen										
                },
              ],
              [
                {
                  fontSize: 8, bold: false, alignment: 'left',
                  margin: [25, 5, 20, 0], // Márgenes para separar la imagen del texto
                  border: [true, false, true, false], // Elimina los bordes de la imagen										
                  table: {
                    widths: ['25%', '25%', '25%', '25%',], // Divide la página en 3 columnas
                    body: [
                      [
                        {
                          text: `Selección del producto al cual corresponde la idea`,
                          fontSize: 8, bold: false, alignment: 'left',
                          margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                          border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                        {
                          text: `${ideaGeneral.productName ?? ''}`,
                          fillColor: '#F0F0F0',
                          alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                          margin: [0, 5, 0, 0], // Márgenes para separar la imagen del texto
                          colSpan: 3,
                        }, {}, {}
                      ],
                      [
                        {
                          text: `Fecha:`,
                          fontSize: 8, bold: false, alignment: 'left',
                          margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                          border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                        {
                          text: `${ConvertService.convertDateToShow(ideaGeneral.createdAt)}`,
                          alignment: 'center', fontSize: 9, color: '#3C67BC',
                        },
                        {
                          text: 'Código de Registro:',
                          alignment: 'center', fontSize: 9, bold: true,
                        },
                        {
                          text: `${ideaGeneral.registerCode}`,
                          fillColor: '#F0F0F0',
                          alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC', bold: true
                        },
                      ],
                      [
                        {
                          text: `Etapa de preinversión:`,
                          fontSize: 8, bold: false, alignment: 'left',
                          margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                          border: [false, false, false, false], // Elimina los bordes de la imagen	
                        },
                        {
                          text: `${ideaGeneral.stage.name ?? ''}`,
                          alignment: 'left', fontSize: 9, bold: true,
                          colSpan: 2
                        },
                        {},
                        {
                          text: '',
                          border: [false, false, false, false], // Elimina los bordes de la imagen	
                        }
                      ],
                      [
                        {
                          text: `Origen de la idea de proyecto.`,
                          fontSize: 8, bold: false, alignment: 'left', italics: true,
                          margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                          border: [false, false, false, false], // Elimina los bordes de la imagen	
                          colSpan: 4
                        },
                        {},
                        {},
                        {}
                      ],
                      [
                        {
                          text: `Responde a un instrumento de planificación`,
                          fontSize: 8, bold: false, alignment: 'left', italics: true,
                          margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                          border: [false, false, false, false], // Elimina los bordes de la imagen	
                          Span: 3
                        },
                        {
                          text: `${ideaGeneral.planningInstrument ? 'SI' : 'NO'}`,
                          fontSize: 8, bold: false, alignment: 'center', italics: true,
                          margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                          border: [true, true, true, true], // Elimina los bordes de la imagen	
                          Span: 2
                        },
                        {
                          text: `Descripción`,
                          fontSize: 8, bold: false, alignment: 'center', italics: true,
                          margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                          border: [false, false, false, false], // Elimina los bordes de la imagen	
                          Span: 3
                        },
                        {
                          text: `${ideaGeneral.description ?? ''}`,
                          fontSize: 8, bold: false, alignment: 'center', italics: true,
                          margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                          border: [true, true, true, true], // Elimina los bordes de la imagen	
                          Span: 3
                        },
                      ],
                      [
                        {
                          text: '',
                          border: [false, false, false, false], // Elimina los bordes de la imagen	
                          colSpan: 4

                        },
                        {},
                        {},
                        {}
                      ],
                      [
                        {
                          text: '',
                          border: [false, false, false, false], // Elimina los bordes de la imagen	
                          colSpan: 4
                        },
                        {},
                        {},
                        {}
                      ]
                    ]
                  },
                },
              ],

              [
                {
                  fillColor: '#D3DDF0',
                  text: `1.1 \t Datos de quién propone`,
                  fontSize: 8, bold: false, alignment: 'left',
                  margin: [10, 0, 0, 0], // Márgenes para separar la imagen del texto
                  border: [true, false, true, false], // Elimina los bordes de la imagen										
                },
              ],
              [
                {
                  fontSize: 8, bold: false, alignment: 'left',
                  margin: [25, 5, 20, 0], // Márgenes para separar la imagen del texto
                  border: [true, false, true, false], // Elimina los bordes de la imagen										
                  table: {
                    widths: ['30%', '70%'], // Divide la página en 3 columnas
                    body: [
                      [
                        {
                          text: `Nombre de la entidad (Puede ser comite, asociación, cocode, institucion y otro tipo de organización)`,
                          fontSize: 9, bold: false, alignment: 'left',
                          margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                          border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                        {
                          text: `${ideaGeneral.nameEntity ?? ''}`,
                          fillColor: '#F0F0F0',
                          alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                          margin: [0, 5, 0, 0], // Márgenes para separar la imagen del texto
                        }
                      ],
                      [
                        {
                          text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                        {
                          text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                      ],
                      [
                        {
                          text: `Nombre del responsable del proyecto o representante legal`,
                          fontSize: 9, bold: false, alignment: 'left',
                          margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                          border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                        {
                          text: `${ideaGeneral.responsibleName ?? ''}`,
                          alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                          margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                        },
                      ],
                      [
                        {
                          text: `Correo de contacto`,
                          fontSize: 9, bold: false, alignment: 'left',
                          margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                          border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                        {
                          text: `${ideaGeneral.email ?? ''}`,
                          alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                          margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                        },
                      ],
                      [
                        {
                          text: `Telefono del contacto`,
                          fontSize: 9, bold: false, alignment: 'left',
                          margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                          border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                        {
                          text: `${ideaGeneral.phone ?? ''}`,
                          alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                          margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                        },
                      ],
                    ],
                  },
                },
              ],
              [
                {
                  fillColor: '#B7C5E4',
                  text: `2 \t Definición del problema, necesidad o potencialidad de invversión, causas y efectos`,
                  fontSize: 8, bold: false, alignment: 'left',
                  margin: [10, 0, 0, 0], // Márgenes para separar la imagen del texto
                  border: [true, false, true, false], // Elimina los bordes de la imagen										
                },
              ],
              [
                {
                  fontSize: 8, bold: false, alignment: 'left',
                  margin: [25, 5, 20, 0], // Márgenes para separar la imagen del texto
                  border: [true, false, true, false], // Elimina los bordes de la imagen										
                  table: {
                    widths: ['15%', '15%%', '70%'], // Divide la página en 3 columnas
                    body: [
                      [
                        {},
                        {
                          text: ``,
                          fontSize: 9, bold: false, alignment: 'right', italics: true,
                          margin: [-30, 0, 25, 0], // Márgenes para separar la imagen del texto
                        },
                        {
                          text: 'Descripción',
                          alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                          margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                          border: [true, true, true, true], // Elimina los bordes de la imagen										
                        },
                      ],
                      ...effectsArray,
                    ],
                  },
                  layout: {
                    defaultBorder: false,
                  }
                },
              ],
              [
                {
                  fontSize: 8, bold: false, alignment: 'left',
                  margin: [25, 5, 20, -5], // Márgenes para separar la imagen del texto
                  border: [true, false, true, false], // Elimina los bordes de la imagen										
                  table: {
                    widths: ['30%', '70%'], // Divide la página en 3 columnas
                    body: [
                      [
                        {
                          text: `Definición de la problemática o potencialidad central`,
                          fontSize: 9, bold: true, alignment: 'center',
                          margin: [-30, 0, 0, 0], // Márgenes para separar la imagen del texto
                          border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                        {
                          text: `${ideaGeneral.definitionPotentiality ?? ''}`,
                          alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                          margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                        },
                      ],
                      [
                        {
                          text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                        {
                          text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                      ],
                    ],
                  },
                },
              ],
              [
                {
                  fontSize: 8, bold: false, alignment: 'left',
                  margin: [25, 5, 20, 0], // Márgenes para separar la imagen del texto
                  border: [true, false, true, false], // Elimina los bordes de la imagen										
                  table: {
                    widths: ['15%', '15%%', '70%'], // Divide la página en 3 columnas
                    body: [
                      ...causesArray
                    ],
                  },
                  layout: {
                    defaultBorder: false,
                  }
                },
              ],
              [
                {
                  fontSize: 8, bold: false, alignment: 'left',
                  margin: [25, 5, 20, 0], // Márgenes para separar la imagen del texto
                  border: [true, false, true, false], // Elimina los bordes de la imagen										
                  table: {
                    widths: ['30%', '70%'], // Divide la página en 3 columnas
                    body: [
                      [
                        {
                          text: `Indicador de la problematica/Línea de base`,
                          fontSize: 9, bold: false, alignment: 'center',
                          margin: [-30, 0, 0, 0], // Márgenes para separar la imagen del texto
                          border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                        {
                          text: `${ideaGeneral.baseLine ?? ''}`,
                          alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                          margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                        },
                      ],
                      [
                        {
                          text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                        {
                          text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                      ],
                      [
                        {
                          text: [{ text: 'Breve descripción de la situación actual', fontSize: 9, bold: true }, '(Vincularlo al instrumento de planificación estratégico que corresponda)'],
                          fontSize: 9, bold: false, alignment: 'center',
                          margin: [-30, 0, 0, 0], // Márgenes para separar la imagen del texto
                          border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                        {
                          text: `${ideaGeneral.descriptionCurrentSituation ?? ''}`,
                          alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                          margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                        },
                      ],
                      [
                        {
                          text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                        {
                          text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                      ],
                    ],
                  },
                },
              ],
              [
                {
                  fillColor: '#B7C5E4',
                  text: `3 \t Definición del cambio esperado`,
                  fontSize: 8, bold: false, alignment: 'left',
                  margin: [10, 0, 0, 0], // Márgenes para separar la imagen del texto
                  border: [true, false, true, false], // Elimina los bordes de la imagen										
                },
              ],
              [
                {
                  fontSize: 8, bold: false, alignment: 'left',
                  margin: [25, 5, 20, 0], // Márgenes para separar la imagen del texto
                  border: [true, false, true, false], // Elimina los bordes de la imagen										
                  table: {
                    widths: ['30%', '70%'], // Divide la página en 3 columnas
                    body: [
                      [
                        {
                          text: `Descripcion de objetivo general`,
                          fontSize: 9, bold: false, alignment: 'left',
                          margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                          border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                        {
                          text: `${ideaGeneral.generalObjective ?? ''}`,
                          fillColor: '#F0F0F0',
                          alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                          margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                        }
                      ],
                      [
                        {
                          text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                        {
                          text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                      ],
                      [
                        {
                          text: `Resultado o cambio esperado respecto a indicadores (resultado final)`,
                          fontSize: 9, bold: false, alignment: 'center',
                          margin: [-30, 0, 0, 0], // Márgenes para separar la imagen del texto
                          border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                        {
                          text: `${ideaGeneral.expectedChange ?? ''}`,
                          alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                          margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                        },
                      ],
                      [
                        {
                          text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                        {
                          text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                        },
                      ],
                    ],
                  },
                },
              ],



              ...alternatives

            ]
          }
        }
      ],
    }

    const print = pdfMake.createPdf(reportIdea, null, null, pdfFonts.pdfMake.vfs).open();


  }


  getEffects(effectsArr: PossibleEffect[]) {

    if (effectsArr.length > 0) {
      const arrEfectsTable: any[] = [
      ]

      effectsArr.forEach((posibleEffectArr: PossibleEffect, index: number) => {
        if (index === 0) {
          arrEfectsTable.push(
            [
              {
                text: `Posibles efectos`,
                Span: 3,
                fontSize: 9, bold: false, alignment: 'center',
                margin: [0, 10, 0, 0], // Márgenes para separar la imagen del texto
                border: [false, false, false, false], // Elimina los bordes de la imagen										
              },
              {
                text: `Efecto ${index + 1}`,
                fontSize: 9, bold: false, alignment: 'right', italics: true,
                margin: [0, 0, 25, 0], // Márgenes para separar la imagen del texto
              },
              {
                text: `${posibleEffectArr.description}`,
                fillColor: '#F0F0F0',
                alignment: 'left', fontSize: 9, italics: true, color: '#3C67BC',
                margin: [0, 5, 0, 0], // Márgenes para separar la imagen del texto
                border: [true, true, true, true], // Elimina los bordes de la imagen										
              }
            ],
          )
        } else {
          arrEfectsTable.push(
            [
              {},
              {
                text: `Efecto ${index + 1}`,
                fontSize: 9, bold: false, alignment: 'right', italics: true,
                margin: [-30, 0, 25, 0], // Márgenes para separar la imagen del texto
              },
              {
                text: `${posibleEffectArr.description}`,
                alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                border: [true, true, true, true], // Elimina los bordes de la imagen										
              },
            ],
          )
        }
      })

      return arrEfectsTable


    } else {
      const arrEfectsTable = [
        [
          {
            text: `Posibles efectos`,
            Span: 3,
            fontSize: 9, bold: false, alignment: 'center',
            margin: [0, 10, 0, 0], // Márgenes para separar la imagen del texto
            border: [false, false, false, false], // Elimina los bordes de la imagen										
          },
          {
            text: `Efecto`,
            fontSize: 9, bold: false, alignment: 'right', italics: true,
            margin: [0, 0, 25, 0], // Márgenes para separar la imagen del texto
          },
          {
            text: 'Sin Efectos',
            fillColor: '#F0F0F0',
            alignment: 'left', fontSize: 9, italics: true, color: '#3C67BC',
            margin: [0, 5, 0, 0], // Márgenes para separar la imagen del texto
            border: [true, true, true, true], // Elimina los bordes de la imagen										
          }
        ],
      ]

      return arrEfectsTable

    }
  }



  getTerrainsInfo(terrains: DataGeo[]) {

    if (terrains.length > 0) {
      const arrTerrainsTable: any[] = [
      ]

      terrains.forEach((terrain: DataGeo, index: number) => {

          arrTerrainsTable.push(
            [
              {
                margin: [-15, 10, 0, 10], // Márgenes para separar la imagen del texto
                text: `d.2`,
                fontSize: 8, bold: true, alignment: 'center',
                border: [false, false, false, false], // Elimina los bordes de la imagen										
              },
              {
                text: `Situacion legal del posible bien inmueble`,
                fontSize: 8, bold: true, alignment: 'left',
                margin: [-15, 10, 0, 0], // Márgenes para separar la imagen del texto
                border: [false, false, false, false], // Elimina los bordes de la imagen										
                colSpan: 3
              },
              {
                text: '',
                border: [],
              },
              {
                text: '',
                border: [],
              },
              {
                text: 'Terreno a nombre el Estado',
                border: [], alignment: 'left'
              }, {
                text: `${terrain.governmentTerrain ? "SI" : 'NO'}`,
                alignment: 'center'
              },
              {
                text: 'se debe de inscribir el terreno a nombre del Estado',
                border: [], alignment: 'left'
              },
              { 
                text: `${terrain.registerGovernmentTerrain ? "SI" : 'NO'}`,
              alignment: 'center' }
            ],
            [
              {
                margin: [-15, 10, 0, 10], // Márgenes para separar la imagen del texto
                text: ``,
                fontSize: 8, bold: true, alignment: 'center',
                border: [false, false, false, false], // Elimina los bordes de la imagen										
              },
              {
                text: `Observación`,
                fontSize: 8, bold: true, alignment: 'left',
                margin: [-15, 10, 0, 0], // Márgenes para separar la imagen del texto
                border: [false, false, false, false], // Elimina los bordes de la imagen										
              },
              {
                fillColor: '#F0F0F0',
                text: `${terrain.description ? terrain.description : ''}`,
                border: [true, true, true, true], // Elimina los bordes de la imagen										
                colSpan: 6
              },
              {
                text: '',
                border: [],
              },
              {
                text: '',
                border: [],
              }, {},
              {
                text: '',
                border: [],
              }, {},
                            ],
            [
              {
                margin: [-15, 10, 0, 10], // Márgenes para separar la imagen del texto
                text: `d.3`,
                fontSize: 8, bold: true, alignment: 'center',
                border: [false, false, false, false], // Elimina los bordes de la imagen										
              },
              {
                text: `Características del posible terreno`,
                fontSize: 8, bold: true, alignment: 'left',
                margin: [-15, 10, 0, 0], // Márgenes para separar la imagen del texto
                border: [false, false, false, false], // Elimina los bordes de la imagen	
                colSpan: 4
              },
              {
                text: '',
                border: [],
              },
              {
                text: '',
                border: [],
              },
              {
                text: '',
                border: [],
              },
              {
                text: '',
                border: [],
              }, {
                text: '',
                border: [],
              },
              {
                text: '',
                border: [],
              },
                            ],
            [
              {
                margin: [-15, 10, 0, 10], // Márgenes para separar la imagen del texto
                text: ``,
                fontSize: 8, bold: true, alignment: 'center',
                border: [false, false, false, false], // Elimina los bordes de la imagen										
              },
              {
                text: `Plano`,
                fontSize: 8, bold: false, alignment: 'right',
                margin: [-15, 10, 0, 0], // Márgenes para separar la imagen del texto
                border: [false, false, false, false], // Elimina los bordes de la imagen										
              }, {
                text: `${terrain.plano ? "SI" : 'NO'}`,
                alignment: 'center'
              },
              {
                text: '',
                border: [],
              },
              {
                text: 'Inclinación leve',
                border: [], alignment: 'right'
              }, {
                text: `${terrain.slightIncline ? "SI" : 'NO'}`,
                alignment: 'center'
              },
              {
                text: 'Quebrado',
                border: [], alignment: 'right'
              }, { 
                text: `${terrain.broken ? "SI" : 'NO'}`,
                alignment: 'center' },
                            ],
            [
              {
                margin: [-15, 10, 0, 10], // Márgenes para separar la imagen del texto
                text: ``,
                fontSize: 8, bold: true, alignment: 'center',
                border: [false, false, false, false], // Elimina los bordes de la imagen										
              },
              {
                text: `Subir imagen del terreno`,
                fontSize: 8, bold: false, alignment: 'right',
                margin: [-15, 10, 0, 0], // Márgenes para separar la imagen del texto
                border: [false, false, false, false], // Elimina los bordes de la imagen										
              }, {
                text: `${terrain.imageUrl ? "SI" : 'NO'}`,
                alignment: 'center'
              },
              {
                text: 'Descripción del Terreno:',
                border: [], alignment: 'left'
              },
              {
                text: `${terrain.descriptionLocation ? terrain.descriptionLocation : ''}`,
                border: [true, true, true, true], // Elimina los bordes de la imagen										
                colSpan: 4
              },
              {
                text: '',
                border: [], alignment: 'right'
              },
              {
                text: '',
                border: [], alignment: 'right'
              },
              {
                text: '',
                border: [], alignment: 'right'
              },
                            ],
            [
              {
                margin: [-15, 10, 0, 10], // Márgenes para separar la imagen del texto
                text: `d.4`,
                fontSize: 8, bold: true, alignment: 'center',
                border: [false, false, false, false], // Elimina los bordes de la imagen										
              },
              {
                text: `Servicios básicos del posible terreno`,
                fontSize: 8, bold: false, alignment: 'right',
                margin: [-15, 10, 0, 0], // Márgenes para separar la imagen del texto
                border: [false, false, false, false], // Elimina los bordes de la imagen										
              }, {
                text: `${terrain.basicServices ? "SI" : 'NO'}`,
                alignment: 'center'
              },
              {
                text: 'Descripcion de los servicios básicos:',
                border: [], alignment: 'left'
              },
              {
                text: `${terrain.descriptionBasicServices ? terrain.descriptionBasicServices : ''}`,
                border: [true, true, true, true], // Elimina los bordes de la imagen										
                colSpan: 4
              },
              {
                text: '',
                border: [], alignment: 'right'
              },
              {
                text: '',
                border: [], alignment: 'right'
              },
              {
                text: '',
                border: [], alignment: 'right'
              },
                            ],
            [
              {
                margin: [-15, 10, 0, 10], // Márgenes para separar la imagen del texto
                text: `d.5`,
                fontSize: 8, bold: true, alignment: 'center',
                border: [false, false, false, false], // Elimina los bordes de la imagen										
              },
              {
                text: `Coordenadas geográficas`,
                fontSize: 8, bold: true, alignment: 'left',
                margin: [-15, 10, 0, 0], // Márgenes para separar la imagen del texto
                border: [false, false, false, false], // Elimina los bordes de la imagen										
                colSpan: 7
              },
              {},
              {},
              {},
              {}, {},
              {},
                            ], [
              {
                text: '', border: []
              },
              {
                text: 'Terreno:',
                border: [true, true, false, true], // Elimina los bordes de la imagen										
              },
              {
                text: `Longitud: (x): ${terrain.degreesx}` ,
                border: [false, true, false, true], // Elimina los bordes de la imagen										
                colSpan: 2
              },
              {},
              {
                text: `Latitud: (y): ${terrain.degreesy}` ,
                border: [false, true, false, true], // Elimina los bordes de la imagen										
                colSpan: 2
              },
              {},
              {
                text: `Altitud: (msnm): ${terrain.secondsx}, ${terrain.secondsy}` ,
                border: [false, true, true, true], // Elimina los bordes de la imagen										
                colSpan: 2
              }
          
            ],
            // [
            //   {
            //     margin: [-15, 10, 0, 10], // Márgenes para separar la imagen del texto
            //     text: `d.6`,
            //     fontSize: 8, bold: true, alignment: 'center',
            //     border: [false, false, false, false], // Elimina los bordes de la imagen										
            //   },
            //   {
            //     text: `Breve descripción  de la posible ubicación`,
            //     fontSize: 8, bold: true, alignment: 'left',
            //     margin: [-15, 10, 0, 0], // Márgenes para separar la imagen del texto
            //     border: [false, false, false, false], // Elimina los bordes de la imagen										
            //     colSpan: 2
            //   },
            //   {
            //   },
            //   {
            //     text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. I',
            //     colSpan: 5,
            //     border: [true, true, true, true], // Elimina los bordes de la imagen										
            //   },
            //   {
            //     text: '',
            //     border: [],
            //   },
            //   {
            //     text: '',
            //     border: [],
            //   }, {
            //     text: '',
            //     border: [],
            //   },
            //   {
            //     text: '',
            //     border: [],
            //   },
            //                 ],
          )
        
      })

      return arrTerrainsTable


    } else {
      const arrTerrainTable = [
[        {
          text: ``,
          border: [false, false, false, false], // Elimina los bordes de la imagen										
        },
        {
          text: ``,
          border: [false, false, false, false], // Elimina los bordes de la imagen										
        },
        {
          text: ``,
          border: [false, false, false, false], // Elimina los bordes de la imagen										
        },
        {
          text: ``,
          border: [false, false, false, false], // Elimina los bordes de la imagen										
        },
        {
          text: ``,
          border: [false, false, false, false], // Elimina los bordes de la imagen										
        },
        {
          text: ``,
          border: [false, false, false, false], // Elimina los bordes de la imagen										
        },
        {
          text: ``,
          border: [false, false, false, false], // Elimina los bordes de la imagen										
        },
        {
          text: ``,
          border: [false, false, false, false], // Elimina los bordes de la imagen										
        }]
      ]

      return arrTerrainTable

    }
  }


  getCauses(causesArr: PossibleCause[]) {

    if (causesArr.length > 0) {
      const arrCausesTable: any[] = [
      ]

      causesArr.forEach((posibleCauseArr: PossibleCause, index: number) => {
        if (index === 0) {
          arrCausesTable.push(
            [
              {
                text: `Posibles Causas`,
                Span: 3,
                fontSize: 9, bold: false, alignment: 'center',
                margin: [0, 10, 0, 0], // Márgenes para separar la imagen del texto
                border: [false, false, false, false], // Elimina los bordes de la imagen										
              },
              {
                text: `Causa ${index + 1}`,
                fontSize: 9, bold: false, alignment: 'right', italics: true,
                margin: [0, 0, 25, 0], // Márgenes para separar la imagen del texto
              },
              {
                text: `${posibleCauseArr.description}`,
                fillColor: '#F0F0F0',
                alignment: 'left', fontSize: 9, italics: true, color: '#3C67BC',
                margin: [0, 5, 0, 0], // Márgenes para separar la imagen del texto
                border: [true, true, true, true], // Elimina los bordes de la imagen										
              }
            ],
          )
        } else {
          arrCausesTable.push(
            [
              {},
              {
                text: `Causa ${index + 1}`,
                fontSize: 9, bold: false, alignment: 'right', italics: true,
                margin: [-30, 0, 25, 0], // Márgenes para separar la imagen del texto
              },
              {
                text: `${posibleCauseArr.description}`,
                alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                border: [true, true, true, true], // Elimina los bordes de la imagen										
              },
            ],
          )
        }
      })

      return arrCausesTable


    } else {
      const arrCausesTable = [
        [
          {
            text: `Posibles Causas`,
            Span: 3,
            fontSize: 9, bold: false, alignment: 'center',
            margin: [0, 10, 0, 0], // Márgenes para separar la imagen del texto
            border: [false, false, false, false], // Elimina los bordes de la imagen										
          },
          {
            text: `Causa`,
            fontSize: 9, bold: false, alignment: 'right', italics: true,
            margin: [0, 0, 25, 0], // Márgenes para separar la imagen del texto
          },
          {
            text: 'No hay causas',
            fillColor: '#F0F0F0',
            alignment: 'left', fontSize: 9, italics: true, color: '#3C67BC',
            margin: [0, 5, 0, 0], // Márgenes para separar la imagen del texto
            border: [true, true, true, true], // Elimina los bordes de la imagen										
          }
        ],
      ]

      return arrCausesTable

    }
  }

  getAlternatives(alternativesToPrint: IdeaAlternative[]) {
    console.log("🚀 ~ file: report-idea.service.ts:714 ~ ReportIdeaService ~ getAlternatives ~ alternativesToPrint:", alternativesToPrint)



    if (alternativesToPrint.length > 0) {
      const arrTableAlternatives: any[] = [];

      alternativesToPrint.forEach((alternative: IdeaAlternative, index: number) => {

        let terainsFormat = [
[          {
            text: ``,
            border: [false, false, false, false], // Elimina los bordes de la imagen										
          },
          {
            text: ``,
            border: [false, false, false, false], // Elimina los bordes de la imagen										
          },
          {
            text: ``,
            border: [false, false, false, false], // Elimina los bordes de la imagen										
          },
          {
            text: ``,
            border: [false, false, false, false], // Elimina los bordes de la imagen										
          },
          {
            text: ``,
            border: [false, false, false, false], // Elimina los bordes de la imagen										
          },
          {
            text: ``,
            border: [false, false, false, false], // Elimina los bordes de la imagen										
          },
          {
            text: ``,
            border: [false, false, false, false], // Elimina los bordes de la imagen										
          },
          {
            text: ``,
            border: [false, false, false, false], // Elimina los bordes de la imagen										
          }]
        ]        
        if (alternative.geoArea && alternative.geoArea.dataGeo){
          terainsFormat = this.getTerrainsInfo(alternative.geoArea.dataGeo)
        }


        arrTableAlternatives.push(
          [
            {
              fillColor: '#2D3746',
              text: `ALTERNATIVA DE IDEA DE PROYECTO ${index + 1}`,
              lineHeight: 1.5,
              fontSize: 12, bold: true, color: '#fff', alignment: 'center',
              margin: [0, 10, 0, 0], // Márgenes para separar la imagen del texto
              border: [true, true, true, true], // Elimina los bordes de la imagen										
            },
          ],

          [
            {
              fillColor: '#B7C5E4',
              text: `A \t Nombre preliminar de la idea de proyecto de inversión en relación a la alternariva seleccionada`,
              fontSize: 8, bold: true, alignment: 'left',
              margin: [10, 0, 0, 0], // Márgenes para separar la imagen del texto
              border: [true, false, true, false], // Elimina los bordes de la imagen										
            },
          ],
          [
            {
              fontSize: 8, bold: false, alignment: 'left',
              margin: [25, 5, 20, 0], // Márgenes para separar la imagen del texto
              border: [true, false, true, false], // Elimina los bordes de la imagen										
              table: {
                widths: ['30%', '70%'], // Divide la página en 3 columnas
                body: [
                  [
                    {
                      text: `TIPO DE IDEA DE PROYECTO`,
                      fontSize: 8, bold: true, alignment: 'left',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.preName && alternative.preName.typeProject ? alternative.preName.typeProject : ''}`,
                      fillColor: '#F0F0F0',
                      alignment: 'left', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 5, 0, 0], // Márgenes para separar la imagen del texto
                    }
                  ],
                  [
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                  ],
                  [
                    {
                      text: `a. Proceso`,
                      fontSize: 9, bold: false, alignment: 'left',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.preName && alternative.preName.proccess ? alternative.preName.proccess : ''}`,
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                    },
                  ],
                  [
                    {
                      text: `b. Objeto`,
                      fontSize: 9, bold: false, alignment: 'left',
                      margin: [0, 0, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.preName && alternative.preName.object ? alternative.preName.object : ''}`,
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                    },
                  ]
                ],
              },
            },
          ],
          [
            {
              fontSize: 8, bold: false, alignment: 'left',
              margin: [25, 5, 20, 0], // Márgenes para separar la imagen del texto
              border: [true, false, true, false], // Elimina los bordes de la imagen										
              table: {
                widths: ['45%', '55%'], // Divide la página en 3 columnas
                body: [
                  [
                    {
                      text: `Departamento`,
                      fontSize: 9, bold: false, alignment: 'left',
                      margin: [130, 0, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.preName && alternative.preName.departament ? alternative.preName.departament : ''}`,
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                    },
                  ],
                  [
                    {
                      text: `Municipio`,
                      fontSize: 9, bold: false, alignment: 'left',
                      margin: [130, 0, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.preName && alternative.preName.municipality ? alternative.preName.municipality : ''}`,
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                    },
                  ],
                  [
                    {
                      text: `Nombre Preliminar del Proyecto`,
                      fontSize: 8, bold: true, alignment: 'left',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.preName && alternative.preName.preliminaryName ? alternative.preName.preliminaryName : ''}`,
                      fillColor: '#F0F0F0',
                      alignment: 'left', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 5, 0, 0], // Márgenes para separar la imagen del texto
                    }
                  ],
                ],

              },
            },
          ],
          [
            {
              fillColor: '#B7C5E4',
              text: `B \t Entidad Responsable`,
              fontSize: 8, bold: true, alignment: 'left',
              margin: [10, 0, 0, 0], // Márgenes para separar la imagen del texto
              border: [true, false, true, false], // Elimina los bordes de la imagen										
            },
          ],
          [
            {
              fontSize: 8, bold: false, alignment: 'left',
              margin: [25, 5, 20, 0], // Márgenes para separar la imagen del texto
              border: [true, false, true, false], // Elimina los bordes de la imagen										
              table: {
                widths: ['45%', '55%'], // Divide la página en 3 columnas
                body: [
                  [
                    {
                      text: `Nombre de la EPI (sectorial o territorial)`,
                      fontSize: 8, bold: true, alignment: 'center',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.resEntity && alternative.resEntity.nameEPI ? alternative.resEntity.nameEPI : ''}`,
                      fillColor: '#F0F0F0',
                      alignment: 'left', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 5, 0, 0], // Márgenes para separar la imagen del texto
                    }
                  ],
                  [
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                  ],
                  [
                    {
                      text: ` Nombre del responsable del proyecto`,
                      fontSize: 9, bold: false, alignment: 'center',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.resEntity && alternative.resEntity.leaderName ? alternative.resEntity.leaderName : ''}`,
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                    },
                  ],
                  [
                    {
                      text: `Correo de contacto`,
                      fontSize: 9, bold: false, alignment: 'center',
                      margin: [0, 0, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.resEntity && alternative.resEntity.email ? alternative.resEntity.email : ''}`,
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                    },
                  ],
                  [
                    {
                      text: `Telefono del contacto`,
                      fontSize: 9, bold: false, alignment: 'center',
                      margin: [0, 0, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.resEntity && alternative.resEntity.phone ? alternative.resEntity.phone : ''}`,
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                    },
                  ],
                ],
              },
            },
          ],

          [
            {
              fillColor: '#B7C5E4',
              text: `C \t Delimitación preliminar de los posibles beneficiarios`,
              fontSize: 8, bold: true, alignment: 'left',
              margin: [10, 0, 0, 0], // Márgenes para separar la imagen del texto
              border: [true, false, true, false], // Elimina los bordes de la imagen										
            },
          ],
          [
            {
              fontSize: 8, bold: false, alignment: 'left',
              margin: [5, 5, 20, 0], // Márgenes para separar la imagen del texto
              border: [true, false, true, false], // Elimina los bordes de la imagen										
              table: {
                widths: ['10%', '35%', '55%'], // Divide la página en 3 columnas
                body: [
                  [
                    {
                      margin: [0, 10, 0, 10], // Márgenes para separar la imagen del texto
                      text: `c.1`,
                      fontSize: 8, bold: true, alignment: 'center',
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `Población de referencia`,
                      fontSize: 8, bold: true, alignment: 'left',
                      margin: [0, 10, 0, 10], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.popDelimit && alternative.popDelimit.totalPopulation ? alternative.popDelimit.totalPopulation : ''}`,
                      fillColor: '#F0F0F0',
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 5, 0, 5], // Márgenes para separar la imagen del texto
                    }
                  ],
                  [
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    }, {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                  ],
                  [
                    {
                      text: `c.2`,
                      fontSize: 8, bold: true, alignment: 'center',
                      margin: [0, 15, 0, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    }, {
                      text: `Delimitación`,
                      fontSize: 8, bold: true, alignment: 'left',
                      margin: [0, 15, 0, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.popDelimitdenmtion && alternative.popDelimitdenmtion.name ? alternative.popDelimitdenmtion.name : ''}`,
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                    },
                  ],
                  [
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    }, {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                  ],
                  [
                    {
                      text: `c.3`,
                      fontSize: 8, bold: true, alignment: 'center',
                      margin: [0, 15, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen	
                    },
                    {
                      text: `Estimación preliminar de beneficiarios`,
                      fontSize: 8, bold: true, alignment: 'left',
                      margin: [0, 15, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.popDelimit && alternative.popDelimit.estimateBeneficiaries ? alternative.popDelimit.estimateBeneficiaries : ''}`,
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                    },
                  ],
                  [
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    }, {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                  ],
                  [
                    {
                      text: `c.4`,
                      fontSize: 8, bold: false, alignment: 'center',
                      margin: [0, 0, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen 
                    },
                    {
                      text: `Caracterización preliminar`,
                      fontSize: 8, bold: false, alignment: 'left',
                      margin: [0, 0, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.popDelimit && alternative.popDelimit.preliminaryCharacterization ? alternative.popDelimit.preliminaryCharacterization : ''}`,
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                    },
                  ],
                  [
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    }, {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                  ],
                ],
              },
            },
          ],
          [
            {
              fillColor: '#B7C5E4',
              text: `D \t Delimitacion Preliminar del área geográfica`,
              fontSize: 8, bold: true, alignment: 'left',
              margin: [10, 0, 0, 0], // Márgenes para separar la imagen del texto
              border: [true, false, true, false], // Elimina los bordes de la imagen										
            },
          ],
          [
            {
              fontSize: 8, bold: false, alignment: 'left',
              margin: [5, 5, 20, 0], // Márgenes para separar la imagen del texto
              border: [true, false, true, false], // Elimina los bordes de la imagen										
              table: {
                widths: ['10%', '14%', '12.5%', '12.5%', '12.5%', '12.5%', '12.5%', '12.5%'], // Divide la página en 3 columnas
                body: [
                  [
                    {
                      margin: [-15, 10, 0, 10], // Márgenes para separar la imagen del texto
                      text: `d.1`,
                      fontSize: 8, bold: true, alignment: 'center',
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `Identificación de terreno`,
                      fontSize: 8, bold: true, alignment: 'left',
                      margin: [-15, 10, 0, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: '',
                      border: [],
                    },
                    {
                      text: '',
                      border: [],
                    },
                    {
                      text: '',
                      border: [],
                    },
                    {
                      text: '',
                      border: [],
                    }, {
                      text: '',
                      border: [],
                    },
                    {
                      text: '',
                      border: [],
                    },
                  ],
                  [
                    {
                      margin: [-15, 10, 0, 10], // Márgenes para separar la imagen del texto
                      text: ``,
                      fontSize: 8, bold: true, alignment: 'center',
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `Se identifican varios terrenos disponibles`,
                      fontSize: 8, bold: false, alignment: 'left',
                      margin: [-15, 10, 0, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.geoArea && alternative.geoArea.availableTerrain ? 'SI' : 'NO'}`,
                      alignment: 'center'
                    },
                    {
                      text: '',
                      border: [],
                    },
                    {
                      text: 'Se identifica un solo terreno disponible',
                      border: [], alignment: 'left'
                    }, {
                      text: `${alternative.geoArea && alternative.geoArea.oneAvailableTerrain ? 'SI' : 'NO'}`,
                      alignment: 'center'
                    },
                    {
                      text: 'Es necesario invertir en la compra del terreno',
                      border: [], alignment: 'left'
                    }, {
                      text: `${alternative.geoArea && alternative.geoArea.investPurchase ? 'SI' : 'NO'}`,
                      alignment: 'center'
                    },
                  ],
                  ...terainsFormat
                ],
              },
            },
          ],
          [
            {
              fillColor: '#B7C5E4',
              text: `E \t Descripción preliminar de la idea proyecto`,
              fontSize: 8, bold: true, alignment: 'left',
              margin: [10, 0, 0, 0], // Márgenes para separar la imagen del texto
              border: [true, false, true, false], // Elimina los bordes de la imagen										
            },
          ],
          [
            {
              fontSize: 8, bold: false, alignment: 'left',
              margin: [5, 5, 20, 0], // Márgenes para separar la imagen del texto
              border: [true, false, true, false], // Elimina los bordes de la imagen										
              table: {
                widths: ['10%', '35%', '55%'], // Divide la página en 3 columnas
                body: [
                  [
                    {
                      margin: [0, 10, 0, 10], // Márgenes para separar la imagen del texto
                      text: `e.1`,
                      fontSize: 8, bold: true, alignment: 'center',
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `Defina el proyecto por clasificación del grupo sectorial (Tipo de Proyecto):`,
                      fontSize: 8, bold: true, alignment: 'left',
                      margin: [0, 10, 0, 10], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.projDesc && alternative.projDesc.projectType ? alternative.projDesc.projectType : ''}`,
                      fillColor: '#F0F0F0',
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 5, 0, 5], // Márgenes para separar la imagen del texto
                    }
                  ],
                  [
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    }, {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                  ],
                  [
                    {
                      text: `e.2`,
                      fontSize: 8, bold: true, alignment: 'center',
                      margin: [0, 15, 0, 10], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    }, {
                      text: `Proceso de Formulación`,
                      fontSize: 8, bold: true, alignment: 'left',
                      margin: [0, 15, 0, 10], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: [
                        {
                          text: `${alternative.projDesc && alternative.projDesc.formulationProcess ? alternative.projDesc.formulationProcess : ''} \n`,
                        },
                        {
                          text: `${alternative.projDesc && alternative.projDesc.formulationProcessDescription ? alternative.projDesc.formulationProcessDescription : ''}`,
                        }],
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                    },
                  ],
                  [
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    }, {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                  ],
                  [
                    {
                      text: `e.3`,
                      fontSize: 8, bold: false, alignment: 'center',
                      margin: [0, 0, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen	
                    },
                    {
                      text: `Breve descripcion de las posibles intervenciones o acciones a desarrollar`,
                      fontSize: 8, bold: false, alignment: 'left',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.projDesc && alternative.projDesc.descriptionInterventions ? alternative.projDesc.descriptionInterventions : ''}`,
                      alignment: 'center', italics: true, color: '#3C67BC',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                    },
                  ],
                  [
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    }, {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                  ],
                  [
                    {
                      text: `e.4`,
                      fontSize: 8, bold: false, alignment: 'center',
                      margin: [0, 0, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen 
                    },
                    {
                      text: `Complejidad`,
                      fontSize: 8, bold: false, alignment: 'left',
                      margin: [0, 0, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.projDesc && alternative.projDesc.complexity ? alternative.projDesc.complexity : ''}`,
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                    },
                  ],
                  [
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    }, {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                  ],


                  [
                    {
                      text: `e.5`,
                      fontSize: 8, bold: false, alignment: 'center',
                      margin: [0, 0, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen
                    },
                    {
                      text: `Costo estimado de la Preinversion`,
                      fontSize: 8, bold: false, alignment: 'left',
                      margin: [0, 0, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.projDesc && alternative.projDesc.estimatedCost ? alternative.projDesc.estimatedCost : ''}`,
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                    },
                  ],
                  [
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    }, {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                  ],
                  [
                    {
                      text: `e.6`,
                      fontSize: 8, bold: false, alignment: 'center',
                      margin: [0, 0, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen
                    },
                    {
                      text: `Costo estimasdo de la inversión`,
                      fontSize: 8, bold: false, alignment: 'left',
                      margin: [0, 0, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.projDesc && alternative.projDesc.investmentCost ? alternative.projDesc.investmentCost : ''}`,
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                    },
                  ],
                  [
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    }, {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                  ],
                  [
                    {
                      text: `e.7`,
                      fontSize: 8, bold: false, alignment: 'center',
                      margin: [0, 0, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen
                    },
                    {
                      text: `Posibles fuentes de financiamiento`,
                      fontSize: 8, bold: false, alignment: 'left',
                      margin: [0, 0, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.projDesc && alternative.projDesc.foundingSourcesName ? alternative.projDesc.foundingSourcesName : ''}`,
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                    },
                  ],
                  [
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    }, {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                  ],
                  [
                    {
                      text: `e.8`,
                      fontSize: 8, bold: false, alignment: 'center',
                      margin: [0, 0, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen
                    },
                    {
                      text: `Plazo tentativo de ejecución`,
                      fontSize: 8, bold: false, alignment: 'left',
                      margin: [0, 0, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: '',
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                      border: [],
                    },
                  ],
                  [
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    }, {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: '', border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                  ],
                ],
              },
            },
          ],
          [
            {
              fontSize: 8, bold: false, alignment: 'left',
              margin: [5, 0, 20, 0], // Márgenes para separar la imagen del texto
              border: [true, false, true, false], // Elimina los bordes de la imagen										
              table: {
                widths: ['50%', '50%'], // Divide la página en 3 columnas
                body: [
                  [
                    {
                      text: `Plazo tentativo de la preinversión`,
                      fontSize: 8, bold: false, alignment: 'left',
                      margin: [100, 0, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.projDesc && alternative.projDesc.execTime && alternative.projDesc.execTime.tentativeTermMonth ? alternative.projDesc.execTime.tentativeTermMonth : ''}/${alternative.projDesc && alternative.projDesc.execTime && alternative.projDesc.execTime.tentativeTermYear ? alternative.projDesc.execTime.tentativeTermYear : ''}`,
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 0, 0, 0], // Márgenes para separar la imagen del texto
                    },
                  ],
                  [
                    {
                      text: `Fecha probable de inicio de ejecución`,
                      fontSize: 8, bold: false, alignment: 'left',
                      margin: [100, 0, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.projDesc && alternative.projDesc.execTime && alternative.projDesc.execTime.executionDateMonth ? alternative.projDesc.execTime.executionDateMonth : ''}/${alternative.projDesc && alternative.projDesc.execTime && alternative.projDesc.execTime.executionDateYear ? alternative.projDesc.execTime.executionDateYear : ''}`,
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 4, 0, 0], // Márgenes para separar la imagen del texto
                    },
                  ],
                  [
                    {
                      text: `Fecha probable de finalización de la ejecución`,
                      fontSize: 8, bold: false, alignment: 'left',
                      margin: [100, 0, 5, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.projDesc && alternative.projDesc.execTime && alternative.projDesc.execTime.finishDateMonth ? alternative.projDesc.execTime.finishDateMonth : ''}/${alternative.projDesc && alternative.projDesc.execTime && alternative.projDesc.execTime.finishDateYear ? alternative.projDesc.execTime.finishDateYear : ''}`,
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 4, 0, 0], // Márgenes para separar la imagen del texto
                    },
                  ],
                ],
              },
            },
          ],
          [
            {
              fontSize: 8, bold: false, alignment: 'left',
              margin: [5, 5, 20, 0], // Márgenes para separar la imagen del texto
              border: [true, false, true, true], // Elimina los bordes de la imagen										
              table: {
                widths: ['5%', '40%', '20%', '10%', '15%', '10%',], // Divide la página en 3 columnas
                body: [
                  [
                    {
                      margin: [15, 10, -5, 10], // Márgenes para separar la imagen del texto
                      text: `e.9`,
                      fontSize: 8, bold: false, alignment: 'center',
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `Anual o multi-anual:`,
                      fontSize: 8, bold: false, alignment: 'left',
                      margin: [70, 10, 0, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `Anual`,
                      fontSize: 8, bold: false, alignment: 'left',
                      margin: [50, 10, -10, 0], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.projDesc && alternative.projDesc.execTime && alternative.projDesc.execTime.annual ? 'SI' : ''}`,
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 10, 0, 0], // Márgenes para separar la imagen del texto
                    },
                    {
                      text: `multi-anual`,
                      fontSize: 8, bold: false, alignment: 'left',
                      margin: [10, 10, -10, 10], // Márgenes para separar la imagen del texto
                      border: [false, false, false, false], // Elimina los bordes de la imagen										
                    },
                    {
                      text: `${alternative.projDesc && alternative.projDesc.execTime && !alternative.projDesc.execTime.annual ? 'SI' : ''}`,
                      alignment: 'center', fontSize: 9, italics: true, color: '#3C67BC',
                      margin: [0, 10, 0, 0], // Márgenes para separar la imagen del texto
                    },
                  ],
                ],
              },
            },
          ],

        )

      })




      return arrTableAlternatives

    } else {
      const arrTableAlternatives = [
        [
          {
            fillColor: '#2D3746',
            text: `ALTERNATIVA DE IDEA DE PROYECTO`,
            lineHeight: 1.5,
            fontSize: 12, bold: true, color: '#fff', alignment: 'center',
            margin: [0, 10, 0, 0], // Márgenes para separar la imagen del texto
            border: [true, true, true, true], // Elimina los bordes de la imagen										
          },
        ],
        [
          {
            fillColor: '#B7C5E4',
            text: `No se registraron alternativas`,
            fontSize: 8, bold: true, alignment: 'left',
            margin: [10, 0, 0, 0], // Márgenes para separar la imagen del texto
            border: [true, true, true, true], // Elimina los bordes de la imagen										
          },
        ],
      ]

      return arrTableAlternatives

    }


  }

}
