import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { Comment } from '../../modal/app-comment.model';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: []
})
export class CommentComponent implements OnInit {
  comments: Comment[] = [];
  newCommentContent: string = '';
  currentUserId: number = 1;  // Simuler l'utilisateur connecté

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  // Charger tous les commentaires
  loadComments() {
    this.commentService.getAllComments().subscribe(data => {
      this.comments = data;
    });
  }

  // Ajouter un nouveau commentaire
  addComment() {
    if (this.newCommentContent.trim()) {
      const newComment: Comment = {
        content: this.newCommentContent,
        userId: this.currentUserId  // Ajouter userId pour lier le commentaire à l'utilisateur
      };

      this.commentService.addComment(newComment).subscribe(() => {
        this.loadComments();  // Recharger les commentaires après l'ajout
        this.newCommentContent = '';  // Réinitialiser le champ
      });
    }
  }

  // Modifier un commentaire existant
  editComment(comment: Comment) {
    const newContent = prompt("Modifiez votre commentaire :", comment.content);
    if (newContent !== null && newContent !== comment.content) {
      comment.content = newContent;  // Mise à jour du contenu localement
      this.commentService.updateComment(comment.id, newContent).subscribe(() => {
        this.loadComments();  // Recharger les commentaires après modification
      });
    }
  }

  // Supprimer un commentaire
  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe(() => {
      this.loadComments();  // Recharger les commentaires après suppression
    });
  }
}