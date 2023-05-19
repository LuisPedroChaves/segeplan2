import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-modal-guide',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './modal-guide.component.html',
  styleUrls: ['./modal-guide.component.scss']
})
export class ModalGuideComponent {

}
