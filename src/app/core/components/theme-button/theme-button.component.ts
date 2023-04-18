import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThemingService } from '../../services/theming.service';

@Component({
  selector: 'app-theme-button',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './theme-button.component.html',
  styleUrls: ['./theme-button.component.scss']
})
export class ThemeButtonComponent {

  theme = 'light-theme'

  constructor(
    private themingService: ThemingService,
  ) { }

  ngOnInit(): void {

    this.themingService.theme.subscribe((theme: string) => {

      this.theme = theme;

    });

  }

  changeTheme(): void {

    this.theme = (this.theme === 'light-theme') ? 'dark-theme' : 'light-theme'
    this.themingService.theme.next(this.theme)

  }

}
