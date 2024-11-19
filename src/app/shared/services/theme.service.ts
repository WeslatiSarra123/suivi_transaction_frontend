import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  isDarkTheme: string;

  saveTheme(theme: string): void {
    localStorage.setItem('theme', theme);
  }

  // Charger le thème depuis le localStorage
 static loadTheme(): string {
    return localStorage.getItem('theme') || 'light-theme'; // Valeur par défaut : 'light-theme'
  }

  // Appliquer le thème au document
  applyTheme(theme: string): void {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme);
  }

  toggleTheme(): void {
    this.isDarkTheme = (this.isDarkTheme === 'light-theme') ? 'dark-theme' : 'light-theme';
    this.saveTheme(this.isDarkTheme);
    this.applyTheme(this.isDarkTheme);
  }

  static isLightTheme(): boolean {
    if (this.loadTheme() === 'dark-theme') {
      return false;
    }
    return true;
  }

}
