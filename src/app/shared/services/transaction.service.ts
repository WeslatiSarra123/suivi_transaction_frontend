import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transaction} from '../model/transaction.types';
import {environment} from '../../../environment/environement';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactions: Transaction[] = [];

  constructor(private http: HttpClient) {
  }

  searchTransactions(criteria: any): Observable<Transaction[]> {
    let params = new HttpParams().set('date', criteria.date).set('type', criteria.type).set('orderNumber', criteria.orderNumber);

    return this.http.get<Transaction[]>(`${environment.apiUrl}${environment.transactions}search`, {params});
  }

  storeTransactions(transactions: Transaction[]): void {
    this.transactions = transactions;
  }

  // Récupère les transactions stockées
  getStoredTransactions(): Transaction[] {
    return this.transactions;
  }
}

