import { Component, OnInit } from '@angular/core';
import { User } from '../admin/components/dashboard/dashboard.component';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    const userId = 1; // Remplacez par l'ID de l'utilisateur actuel
    this.profileService.getProfile(userId).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération du profil:', error);
      }
    );
  }
}
