import {Component, OnInit} from '@angular/core';
import {CommentTypes} from '../../shared/model/comment.types';
import {CommentService} from '../../shared/services/comment.service';
import {environment} from '../../../environment/environement';
import {User} from '../../shared/model/user.types';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {
  comments: CommentTypes[];
  commentForm: FormGroup;
  editingIndex: number;
  constructor(private commentService: CommentService,
              private modalService: NgbModal,
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

  deleteComment(commentId: any, index: number) {
    this.commentService.deleteComment(commentId).subscribe({
      next: (res: any) => {
        this.comments.splice(index, 1);
      }
    })
  }

  editComment(targetModal, comment: CommentTypes,index:number) {
    this.editingIndex=index;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.commentForm.patchValue({
      id: comment.id,
      subject: comment.subject,
      email: comment.email,
      content: comment.content,

    });
  }

  onSave() {
    this.commentService.editComment(this.commentForm.value).subscribe(res => {
      this.comments[this.editingIndex] = res;
      this.modalService.dismissAll();

    });
  }

  protected readonly environment = environment;
}
