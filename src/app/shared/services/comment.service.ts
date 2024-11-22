import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {environment} from '../../../environment/environement';
import {User} from '../model/user.types';
import {CommentTypes} from '../model/comment.types';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  editComment(comment: CommentTypes): Observable<CommentTypes> {
    return this.http.patch<CommentTypes>(`${environment.apiUrl}${environment.comments}${comment.id}`, comment);
  }

  getAllComments(): Observable<CommentTypes[]> {
    return this.http.get<CommentTypes[]>(`${environment.apiUrl}${environment.comments}`);
  }

  addFeedback(comment: any, userId: number): Observable<CommentTypes> {
    return this.http.post<CommentTypes>(`${environment.apiUrl}${environment.comments}${userId}`, comment);
  }

  deleteComment(id: number): any {
    return this.http.delete(`${environment.apiUrl}${environment.comments}${id}`);
  }


}
