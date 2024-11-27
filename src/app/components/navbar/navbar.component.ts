import {Component, OnInit} from '@angular/core';
import {UserStorageService} from '../../shared/services/user-storage.service';
import {Router} from '@angular/router';
import {ThemeService} from '../../shared/services/theme.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {ADMIN, AGENT, GUEST, USER} from '../../shared/constants/app-constants';

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
              private userStorageService:UserStorageService,
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
      role: GUEST,
      items: [
        {label: 'ChatBoot', link: '/chatBoot/chat'},
        {label: 'Feedback', link: '/feedback'},
        {label: 'Login', link: '/login'},
      ]
    },
    {
      role: USER,
      items: [
        {label: 'Dashboard', link: '/user/dashboard'},
        {label: 'Comments', link: '/user/add-comment'},
        {label: 'Complaint', link: '/user/add-complaint'},
      ]
    },
    {
      role: ADMIN,
      items: [
        {label: 'Dashboard', link: '/admin/dashboard'},
        {label: 'ChatBoot', link: '/chatBoot/chat'},
        {label: 'Comments', link: '/admin/comments'},
        {label: 'Complaints', link: '/admin/show-complaints'},

      ]
    },
    {
      role: AGENT,
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
    this.userStorageService.signOut();
    console.log('Logged out');
    this.isUserLoggedIn = false;
    this.isAdminLoggedIn = false;
    this.isAgentLoggedIn = false;
    this.router.navigateByUrl('login');

  }

  // Méthode pour récupérer les boutons selon le rôle
  getUserMenu() {
    if (this.isUserLoggedIn) return this.menus.find(menu => menu.role === USER)?.items;
    if (this.isAdminLoggedIn) return this.menus.find(menu => menu.role === ADMIN)?.items;
    if (this.isAgentLoggedIn) return this.menus.find(menu => menu.role === AGENT)?.items;
    return this.menus.find(menu => menu.role === GUEST)?.items;
  }

  protected readonly ThemeService = ThemeService;
}

