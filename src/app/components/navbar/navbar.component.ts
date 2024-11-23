import {Component, OnInit} from '@angular/core';
import {UserStorageService} from '../../shared/services/user-storage.service';
import {Router} from '@angular/router';
import {ThemeService} from '../../shared/services/theme.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isUserLoggedIn: boolean = UserStorageService.isUserLoggedIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();
  isAgentLoggedIn: boolean = UserStorageService.isAgentLoggedIn();
  isMobile: boolean = false;
  lightTheme = ThemeService.isLightTheme();

  constructor(private router: Router, private themeService: ThemeService,
              private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.isUserLoggedIn = UserStorageService.isUserLoggedIn();
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
      this.isAgentLoggedIn = UserStorageService.isAgentLoggedIn();
    })
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  public menus: { role: string, items: { label: string, link: string, action?: () => void }[] }[] = [
    {
      role: 'guest',
      items: [
        {label: 'ChatBoot', link: '/chatBoot/chat'},
        {label: 'Feedback', link: '/feedback'},
        {label: 'Login', link: '/login'},
      ]
    },
    {
      role: 'user',
      items: [
        {label: 'Dashboard', link: '/user/dashboard'},
        {label: 'Comments', link: '/user/add-comment'},
      ]
    },
    {
      role: 'admin',
      items: [
        {label: 'Dashboard', link: '/admin/dashboard'},
        {label: 'ChatBoot', link: '/chatBoot/chat'},
        {label: 'Comments', link: '/admin/comments'},

      ]
    },
    {
      role: 'agent',
      items: [
        {label: 'Dashboard', link: '/agent/dashboard'},
        {label: 'ChatBoot', link: '/chatBoot/chat'},
      ]
    }
  ];

  // Méthode pour basculer le thème
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  // Méthode pour se déconnecter
  logout() {
    UserStorageService.signOut();
    console.log('Logged out');
    this.isUserLoggedIn = false;
    this.isAdminLoggedIn = false;
    this.isAgentLoggedIn = false;
    this.router.navigateByUrl('login');

  }

  // Méthode pour récupérer les boutons selon le rôle
  getUserMenu() {
    if (this.isUserLoggedIn) return this.menus.find(menu => menu.role === 'user')?.items;
    if (this.isAdminLoggedIn) return this.menus.find(menu => menu.role === 'admin')?.items;
    if (this.isAgentLoggedIn) return this.menus.find(menu => menu.role === 'agent')?.items;
    return this.menus.find(menu => menu.role === 'guest')?.items;
  }

  protected readonly ThemeService = ThemeService;
}

