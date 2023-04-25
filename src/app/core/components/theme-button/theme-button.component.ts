import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThemingService } from '../../services/theming.service';
import { OverlayContainer } from '@angular/cdk/overlay';

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
    private overlay: OverlayContainer
  ) { }

  ngOnInit(): void {

    this.themingService.theme.subscribe((theme: string) => {

      this.theme = theme;

      if (theme === 'dark-theme') {
        this.overlay.getContainerElement().classList.add(theme);
      } else {
        this.overlay.getContainerElement().classList.remove('dark-theme');
      }

    });

  }

  changeTheme(): void {

    this.theme = (this.theme === 'light-theme') ? 'dark-theme' : 'light-theme'
    this.themingService.theme.next(this.theme)

  }

}
