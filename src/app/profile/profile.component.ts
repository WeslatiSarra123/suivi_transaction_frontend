import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../services/profile.service';
import {User} from '../model/user.types';
import {UserStorageService} from '../services/storage/user-storage.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private profileService: ProfileService,
              private storageService: UserStorageService) {
  }

  ngOnInit(): void {
    const id = UserStorageService.getUserId();
    this.profileService.getProfile(id).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération du profil:', error);
      }
    );
  }

  onEdit() {

  }
}
