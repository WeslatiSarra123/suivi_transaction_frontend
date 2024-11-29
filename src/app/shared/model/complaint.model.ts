import {User} from './user.types';

export interface Complaint {
  id: number;
  description: string;
  status: string;
  transactionDate: Date;
  type: string;
  agentId: number;
  user: User;
  phoneNumber: number;
}
