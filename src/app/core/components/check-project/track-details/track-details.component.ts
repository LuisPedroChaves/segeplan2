import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { CheckProjectStore } from '../../../../modules/check-project/store/reducers/checkProject.reducer';
import { CLOSE_DRAWER2 } from 'src/app/core/store/actions';
import { SharedModule } from 'src/app/shared/shared.module';
import { IAccessRoads, IAdvisoryDoc, IAdvisoryEpi, IAvailableOrg, IComment, IDisasters, IImgVisit, IMeansTransport, IProject, IServiceInf, IThreatTypes, ITrack, IVisitCard } from 'src/app/core/models/seguimiento';
import { ISectorAdvised, IsbSector } from 'src/app/core/models/sinafip/sectorAdvised';

@Component({
  selector: 'app-track-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './track-details.component.html',
  styleUrls: ['./track-details.component.scss']
})
export class TrackDetailsComponent {

  project: IProject;
  track: ITrack;
  epi: IAdvisoryEpi;
  doc: IAdvisoryDoc;
  sectors: ISectorAdvised;
  subSectors: IsbSector;
  comment: IComment;

  visit: IVisitCard;
  accessRoads: IAccessRoads;
  meanstransport: IMeansTransport;
  serviceInf: IServiceInf;
  disaster: IDisasters;
  threatTypes: IThreatTypes;
  availableOrg: IAvailableOrg;
  imgVisit: IImgVisit;


  constructor(
    private checkProjectStore: Store<CheckProjectStore>,
  ) {}

  closeDrawer2(): void {
    this.checkProjectStore.dispatch(CLOSE_DRAWER2())
  }
}
