import { Component, OnInit } from '@angular/core';
import { ThemingService } from 'src/app/core/services/config/theming.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  theme = 'light-theme'

  constructor(
    private themingService: ThemingService
  ) { }

  ngOnInit(): void {
    this.themingService.theme.subscribe((theme: string) => {

      this.theme = theme;

    });
  }

}
