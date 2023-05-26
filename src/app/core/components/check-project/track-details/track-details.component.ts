import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { IAccessRoads, IAdvisoryDoc, IAdvisoryEpi, IAvailableOrg, IComment, IDisasters, IImgVisit, IMeansTransport, IProject, IServiceInf, IThreatTypes, ITrack, IVisitCard } from 'src/app/core/models/seguimiento';
import { ISectorAdvised, IsbSector } from 'src/app/core/models/sinafip/sectorAdvised';
import { READ_SECTORSADVISED } from 'src/app/modules/check-project/store/actions';
import { SectorAdvisedStore } from 'src/app/modules/check-project/store/reducers';
import { CheckProjectStore } from '../../../../modules/check-project/store/reducers/checkProject.reducer';
import { CLOSE_DRAWER2 } from 'src/app/core/store/actions';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-track-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './track-details.component.html',
  styleUrls: ['./track-details.component.scss']
})
export class TrackDetailsComponent implements OnInit, OnDestroy {

  project: IProject;
  track: ITrack;
  epi: IAdvisoryEpi;
  doc: IAdvisoryDoc;
  sectors: ISectorAdvised[] = null;
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

  checkProjectSubscription = new Subscription();
  sectosStoreSubscription = new Subscription();

  constructor(
    private checkProjectStore: Store<CheckProjectStore>,
    private sectorStore: Store<SectorAdvisedStore>,
  ) {}


  ngOnInit(): void {
    this.checkProjectSubscription = this.checkProjectStore.select('checkProject')
      .subscribe(state => {
        if (state.project) {
          this.project = state.project
        }
        if (state.track) {
          this.track = state.track
        }
        if (state.track) {
          this.epi = state.track.advisoryEpi
        }
        if (state.track) {
          this.doc = state.track.advisoryDoc
        }
        if (state.track) {
          this.visit = state.track.visitCard
        }
      })

    this.sectosStoreSubscription = this.sectorStore.select('sectorAdvised')
      .subscribe(state => {

        this.sectors = state.sectorsAdvised;
      })
      this.sectorStore.dispatch(READ_SECTORSADVISED())
  }

  ngOnDestroy(): void {
    this.checkProjectSubscription?.unsubscribe();
    this.sectosStoreSubscription?.unsubscribe();
  }

  closeDrawer2(): void {
    this.checkProjectStore.dispatch(CLOSE_DRAWER2())
  }
}
