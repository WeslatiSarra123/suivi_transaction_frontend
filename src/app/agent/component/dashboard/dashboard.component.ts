import { Component } from '@angular/core';
import { TransactionService } from '../../transaction.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


export enum TransactionType {
  RECHARGE = 'RECHARGE',
  FACTURE = 'FACTURE',
  FORFAIT = 'FORFAIT'
}

export class Transaction {
orderNumber: any;
type: any;
amount: any;
currency: any;
id: number;
  constructor(
    id: number,
    terminalId: string,
    date: string,
    currency: string,
    errorCode: number,
    orderNumber: string,
    orderStatus: number,
    amount: number, 
    type: TransactionType,
){

}
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  searchForm: FormGroup;
  transactionTypes = Object.values(TransactionType);
  transactions: Transaction[] = [];
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private transactionService: TransactionService, private router: Router) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      date: [''],
      type: [''],
      orderNumber: ['']
    });
  }

  onSearch(): void {
    const searchCriteria = this.searchForm.value;
    this.transactionService.searchTransactions(searchCriteria).subscribe(
      (data: Transaction[]) => {
        this.transactionService.storeTransactions(data);  // Stocke les transactions dans le service
        this.router.navigate(['agent/results']);  // Redirection vers la page des résultats
      },
      error => {
        this.errorMessage = "No transactions found for the given information. Please check your details.";
      }
    );
  }
}



