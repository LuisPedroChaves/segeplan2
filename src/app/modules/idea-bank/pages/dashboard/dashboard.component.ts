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

  single: any[] = [];
  multiEntidad: any[] = [];


  constructor(private ideasService: IdeaService) {
    Object.assign(this, { single: this.single });
  }

  ngOnInit(): void {
    this.getIdeas();
  }

  getIdeas(): void {

    const statesIdeas: { name: string, value: number }[] = []


    this.ideasService.getIdeas({}).subscribe(data => {
      console.log("🚀 ~ file: dashboard.component.ts:22 ~ DashboardComponent ~ this.ideasService.getIdeas ~ data:", data)
      this.allIdeas = data;

      if (this.allIdeas.length > 0) {
        // statesIdeas.push({ name: 'Registradas', value: this.allIdeas.length })

        const ideasEnviadas = this.allIdeas.filter((idea) => idea.state == "ENVIADA");
        statesIdeas.push({ name: 'Enviadas', value: ideasEnviadas.length })

        const ideasAnalizadas = this.allIdeas.filter((idea) => idea.state == "CALIFICADA");
        statesIdeas.push({ name: 'Analizadas', value: ideasAnalizadas.length })

        const ideasPertinentes = this.allIdeas.filter((idea) => idea.result == "PERTINENTE");
        statesIdeas.push({ name: 'Pertinentes', value: ideasPertinentes.length })


        const uniqueEntities = [...new Set(this.allIdeas.map((idea) => idea.nameEntity))];

        // Inicializa el array de estadísticas por entidad
        const ideasByEntity = uniqueEntities.map((entityName) => {
          const registeredIdeas = this.allIdeas.filter((idea) => idea.nameEntity === entityName);
          const analyzedIdeas = registeredIdeas.filter((idea) => idea.state == "CALIFICADA");
          const pertinentIdeas = analyzedIdeas.filter((idea) => idea.result == "PERTINENTE");
          const sendedIdeas = registeredIdeas.filter((idea) => idea.state == "ENVIADA");

          return {
            name: entityName,
            series: [
              // { name: 'Registradas', value: registeredIdeas.length },
              { name: 'ENVIADAS', value: sendedIdeas.length },
              { name: 'Analizadas', value: analyzedIdeas.length },
              { name: 'Pertinentes', value: pertinentIdeas.length },
            ],
          };
        });
        this.multiEntidad = ideasByEntity
        console.log("🚀 ~ file: dashboard.component.ts:70 ~ DashboardComponent ~ ideasByEntity ~ ideasByEntity:", ideasByEntity)


      }

      this.single = statesIdeas
      console.log("🚀 ~ file: dashboard.component.ts:46 ~ DashboardComponent ~ getIdeas ~ this.single = statesIdeas:", this.single = statesIdeas)
    })

  }

}
