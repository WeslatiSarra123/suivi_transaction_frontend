import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from '../../environment/environement';
import { CommentTypes } from '../shared/model/comment.types';
import { CommentService } from '../shared/services/comment.service';

@Component({
  selector: 'feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent implements OnInit {
  comments: CommentTypes[];
  commentForm: FormGroup;
  editingIndex: number;
  constructor(private commentService: CommentService,
              private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.getAllComments();
    this.commentForm = this.fb.group({
      id: [],
      subject: [],
      content: [],
      email: [],
    })
  }

  getAllComments() {
    this.commentService.getAllComments().subscribe({
      next: (res) => {
        this.comments = res;
      }
    })
  }

  protected readonly environment = environment;
}



