import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8080/api/comments'; // Update with your API URL
  constructor(private http: HttpClient) {}

  // Récupérer tous les commentaires
  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiUrl);
  }

  // Récupérer les commentaires d'un utilisateur spécifique
  getUserComments(userId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Ajouter un commentaire
  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, comment);
  }

  // Modifier un commentaire
  updateComment(id: number, content: string): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}/${id}`, { content });
  }

  // Supprimer un commentaire
  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
 