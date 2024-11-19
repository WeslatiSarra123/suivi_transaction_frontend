import {Component, OnInit} from '@angular/core';
import {TransactionService} from '../../shared/services/transaction.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Transaction} from '../../shared/model/transaction.types';
import {TransactionType} from '../../shared/enumeration/TransactionType.enum';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  searchForm: FormGroup;
  transactionTypes = Object.values(TransactionType);
  transactions: Transaction[] = [];
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private transactionService: TransactionService, private router: Router) {
  }

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
      {
        next: (data: Transaction[]) => {
          this.transactionService.storeTransactions(data);  // Stocke les transactions dans le service
          this.router.navigate(['agent/results']);  // Redirection vers la page des résultats
        },
        error: () =>
          this.errorMessage = "No transactions found for the given information. Please check your details."
      }
    );
  }
}



