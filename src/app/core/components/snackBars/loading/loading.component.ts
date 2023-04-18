import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: string
  ) { }

}
