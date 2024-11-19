import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SuiviTransactionOredoo';

  constructor( private themeService: ThemeService){}
  ngOnInit():void{
    this.themeService.toggleTheme();
  }
}
