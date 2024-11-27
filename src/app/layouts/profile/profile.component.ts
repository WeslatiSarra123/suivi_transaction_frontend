import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/model/user.types';
import {UserStorageService} from '../../shared/services/user-storage.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {environment} from '../../../environment/environement';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  profileForm: FormGroup;
  selectedFile: any;

  constructor(private userService: UserService,
              private modalService: NgbModal,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      idUser: [],
      email: [],
      name: [],
      phoneNumber: [],
      photo: [],
      address: []
    })
    const id = UserStorageService.getUserId();
    this.userService.getProfile(id).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (error) =>
          console.error('Erreur lors de la récupération du profil:', error)
      }
    );
  }

  handleFile(file: File): void {
    console.log('Received file from child:', file);
    this.selectedFile = file;
    this.profileForm.get('photo')?.setValue(file);
  }

  onEdit(targetModal, user: User) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.patchUser(user)
  }

  onSave() {
    const fd = new FormData();
    fd.append('idUser', this.profileForm.get('idUser').value);
    fd.append('email', this.profileForm.get('email').value);
    fd.append('name', this.profileForm.get('name').value);
    fd.append('phoneNumber', this.profileForm.get('phoneNumber').value);
    fd.append('address', this.profileForm.get('address').value);
    if (this.selectedFile) {
      fd.append('photo', this.selectedFile);
    }
    this.userService.updateProfile(this.profileForm.get('idUser').value, fd).subscribe(res => {
      console.log(res);
      this.modalService.dismissAll();
      this.patchUser(res);
      this.user = res;
    })
  }

  patchUser(user: User) {
    if (user != null) {
      this.profileForm.patchValue({
        idUser: user?.id,
        name: user?.name,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        address: user?.address,
        photo: user?.photo,
      })
    }
  }

  protected readonly environment = environment;
}
