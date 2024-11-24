import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../shared/services/transaction.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Transaction } from '../../shared/model/transaction.types';
import { TransactionType } from '../../shared/enumeration/TransactionType.enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  searchForm: FormGroup;
  transactionTypes = Object.values(TransactionType);
  transactions: Transaction[] = [];
  errorMessage: string = '';
  hasTransactions = false;
  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      date: [''],
      type: [''],
      orderNumber: [''],
    });
  }

  onSearch(): void {
    this.transactions=[];
    this.hasTransactions=false;
    const searchCriteria = this.searchForm.value;
    this.transactionService.searchTransactions(searchCriteria).subscribe({
      next: (data: Transaction[]) => {
        console.log(data);
        if (data.length>0) {
          console.log(this.hasTransactions);
          this.hasTransactions = true;
          this.transactions=data;
        }
        // Stocke les transactions dans le service
        // this.router.navigate(['agent/results']);  // Redirection vers la page des résultats
      },
      error: () => {
        this.errorMessage =
          'No transactions found for the given information. Please check your details.';
        this.snackBar.open(this.errorMessage, 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar',
        });
      },
    });
  }
}
