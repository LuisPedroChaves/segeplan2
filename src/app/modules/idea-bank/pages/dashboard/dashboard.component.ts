import { Component, OnInit } from '@angular/core';
import { IdeaService } from '../../services/idea.service';
import { GeneralInformation } from '../../../../core/models/informationGeneral';
import { single } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  allIdeas: GeneralInformation[] = [];
  ideasRegisterSource: GeneralInformation[] = [];
  ideasSendSource: GeneralInformation[] = [];
  ideasAnalizedSource: GeneralInformation[] = [];
  ideasPertinent: GeneralInformation[] = [];

  ideasStatus: any[] = [];
  ideasResult: any[] = [];

  alternativesResult: any[] = [];

  multiEntidad: any[] = [];
  resultEntidad: any[] = [];


  constructor(private ideasService: IdeaService) {
    Object.assign(this, { single: this.ideasStatus });
  }

  ngOnInit(): void {
    this.getIdeas();
  }

  getIdeas(): void {

    const statesIdeas: { name: string, value: number }[] = []
    const resultIdeas: { name: string, value: number }[] = []
    const resultAlter: { name: string, value: number }[] = []


    this.ideasService.getIdeas({}).subscribe(data => {
      this.allIdeas = data;
      console.log("🚀 ~ file: dashboard.component.ts:42 ~ DashboardComponent ~ this.ideasService.getIdeas ~ this.allIdeas:", this.allIdeas)

      if (this.allIdeas.length > 0) {
        // statesIdeas.push({ name: 'Registradas', value: this.allIdeas.length })

        const ideasEnviadas = this.allIdeas.filter((idea) => idea.state == "ENVIADA");
        statesIdeas.push({ name: 'Enviadas', value: ideasEnviadas.length })

        const ideasAnalizadas = this.allIdeas.filter((idea) => idea.state == "CALIFICADA");
        statesIdeas.push({ name: 'Analizadas', value: ideasAnalizadas.length })

        const ideasCreadas = this.allIdeas.filter((idea) => idea.state == "CREADA");
        statesIdeas.push({ name: 'Registradas', value: ideasCreadas.length })

        const ideasPertinentes = this.allIdeas.filter((idea) => idea.result == "PERTINENTE");
        resultIdeas.push({ name: 'Pertinentes', value: ideasPertinentes.length })

        const ideasNoPertinentes = this.allIdeas.filter((idea) => idea.result == "NO PERTINENTE");
        resultIdeas.push({ name: 'No Pertinentes', value: ideasNoPertinentes.length })

        let etapaPerfil = 0;
        let etapaPref = 0;
        let etapaFact = 0;

        this.allIdeas.forEach((idea) => {
          if (idea.alternatives && idea.alternatives.length > 0) {
            idea.alternatives.forEach((alternativeFind) => {
              if (alternativeFind.preInvestment) {
                if (alternativeFind.preInvestment.etapaValor == 'PERFIL') {
                  etapaPerfil++
                } else if (alternativeFind.preInvestment.etapaValor == 'PREFACTIBILIDAD') {
                  etapaPref++
                } else if (alternativeFind.preInvestment.etapaValor == 'FACTIBILIDAD') {
                  etapaFact++
                }
              }
            })
          }
        })

        resultAlter.push({ name: 'Perfil', value: etapaPerfil });
        resultAlter.push({ name: 'Prefactibilidad', value: etapaPref });
        resultAlter.push({ name: 'Factibilidad', value: etapaFact });


        const uniqueEntities = [...new Set(this.allIdeas.map((idea) => idea.nameEntity))];

        // Inicializa el array de estadísticas por entidad
        const ideasByEntity = uniqueEntities.map((entityName) => {
          const registeredIdeas = this.allIdeas.filter((idea) => idea.nameEntity === entityName);
          const analyzedIdeas = registeredIdeas.filter((idea) => idea.state == "CALIFICADA");
          const sendedIdeas = registeredIdeas.filter((idea) => idea.state == "ENVIADA");
          const createdIdeas = registeredIdeas.filter((idea) => idea.state == "CREADA");
          // const pertinentIdeas = analyzedIdeas.filter((idea) => idea.result == "PERTINENTE");

          return {
            name: entityName,
            series: [
              { name: 'Registradas', value: createdIdeas.length },
              { name: 'ENVIADAS', value: sendedIdeas.length },
              { name: 'Analizadas', value: analyzedIdeas.length },
              // { name: 'Pertinentes', value: pertinentIdeas.length },
            ],
          };
        });
        this.multiEntidad = ideasByEntity

        const ideasByEntityResult = uniqueEntities.map((entityName) => {
          const registeredIdeas = this.allIdeas.filter((idea) => idea.nameEntity === entityName);
          const analyzedIdeas = registeredIdeas.filter((idea) => idea.result == "PERTINENTE");
          const sendedIdeas = registeredIdeas.filter((idea) => idea.result == "NO PERTINENTE");

          return {
            name: entityName,
            series: [
              { name: 'No Pertinentes', value: analyzedIdeas.length },
              { name: 'Pertinentes', value: sendedIdeas.length },
              // { name: 'Pertinentes', value: pertinentIdeas.length },
            ],
          };
        });
        this.resultEntidad = ideasByEntityResult
      }

      this.ideasStatus = statesIdeas
      this.ideasResult = resultIdeas
      this.alternativesResult = resultAlter
    })

  }

}
