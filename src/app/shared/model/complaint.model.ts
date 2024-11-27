export interface Complaint {
  id: number;
  description: string;
  status: string;
  transactionDate: Date,
  type: string,
  agentId: number,
}
