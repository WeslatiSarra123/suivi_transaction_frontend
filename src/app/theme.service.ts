import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkThemeEnabled = false;

  toggleTheme() {
    this.darkThemeEnabled = !this.darkThemeEnabled;
    const theme = this.darkThemeEnabled ? 'dark-theme' : 'light-theme';
    document.body.className = theme;
  }
}
