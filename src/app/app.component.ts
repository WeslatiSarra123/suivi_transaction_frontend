import {Component, OnInit} from '@angular/core';
import {ThemeService} from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'SuiviTransactionOredoo';
  currentTheme: string;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.currentTheme = ThemeService.loadTheme();
    this.themeService.applyTheme(this.currentTheme);
    this.themeService.saveTheme(this.currentTheme);
  }

}
