import {User} from './user.types';

export class CommentTypes {
  id: number;
  email: string;
  subject: string;
  content: string;
  phoneNumber: string;
  user: User;
  createdAt: Date;
}
