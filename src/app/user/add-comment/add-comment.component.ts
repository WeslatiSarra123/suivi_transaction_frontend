import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../shared/model/user.types';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {CommentService} from '../../shared/services/comment.service';
import {UserStorageService} from '../../shared/services/user-storage.service';

@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.scss'
})
export class AddCommentComponent implements OnInit{
  commentForm: FormGroup
  user: User;

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private fb: FormBuilder,
              private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      email: [],
      id: [],
      subject: [],
      content: [],
    })
    this.user = UserStorageService.getUser();
    if (this.user) {
      this.commentForm.patchValue({
        email: this.user?.email,
        id: this.user?.id,
      })
    }
  }

  onSubmit(): void {
    this.commentService.addFeedback(this.commentForm.value, UserStorageService.getUserId()).subscribe({
      next: () => {
        this.router.navigateByUrl("/user/dashboard");
      },
      error: () =>
        this.snackBar.open('Error , Please try again.', 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar'
        })
    })


  }
}
