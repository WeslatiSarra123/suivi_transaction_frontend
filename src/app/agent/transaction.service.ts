import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from './component/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = 'http://localhost:8080/transactions';
  private transactions: Transaction[] = []; 

  constructor(private http: HttpClient) {}

  searchTransactions(criteria: any): Observable<Transaction[]> {
    let params = new HttpParams()
      .set('date', criteria.date)
      .set('type', criteria.type)
      .set('orderNumber', criteria.orderNumber);

    return this.http.get<Transaction[]>(`${this.baseUrl}/search`, { params });
  }

  storeTransactions(transactions: Transaction[]): void {
    this.transactions = transactions;
  }

  // Récupère les transactions stockées
  getStoredTransactions(): Transaction[] {
    return this.transactions;
  }
}

