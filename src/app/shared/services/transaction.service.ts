import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../model/transaction.types';
import { environment } from '../../../environment/environement';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactions: Transaction[] = [];

  constructor(private http: HttpClient) {}

  searchTransactions(criteria: any): Observable<Transaction[]> {
    let params = new HttpParams()
      .set('date', criteria.date)
      .set('type', criteria.type)
      .set('orderNumber', criteria.orderNumber);

    return this.http.get<Transaction[]>(
      `${environment.apiUrl}${environment.transactions}search`,
      { params }
    );
  }

  // storeTransactions(transactions: Transaction[]): void {
  //   console.log(transactions);
    
  //     this.transactions = transactions;
  // }

  // // Récupère les transactions stockées
  // getStoredTransactions(): Transaction[] {
  //   console.log(this.transactions);
  //   if(this.transactions.length>0){
  //     return this.transactions;
  //   }
  //   return null;
  // }

  // Récupère les transactions stockées
  checkRejected(id: number): Observable<Transaction> {
  return  this.http.get<Transaction>(`${environment.apiUrl}${environment.transactions}check-rejected/${id}`);
  }
}
