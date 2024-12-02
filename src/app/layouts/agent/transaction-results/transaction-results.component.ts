import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {TransactionService} from '../../../shared/services/transaction.service';
import {Transaction} from '../../../shared/model/transaction.types';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-transaction-results',
  templateUrl: './transaction-results.component.html',
  styleUrl: './transaction-results.component.scss',
})
export class TransactionResultsComponent {
  @Input() transactions: Transaction[] = [];
  transaction: Transaction;
  errorMessage: string = '';
  isPayNowEnabled: boolean = false;
  handler: any = null;

  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadStripe();
   
  }

  payNow(transaction: Transaction, index: number) {
    let transactionApproved;
    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51QD7EKEQciJg6fdejdysNrjR0vydXih3oj29K7CLbADOSYjRJsLPg4pVRHpDoDbO95Q3utkwh50nf4cX0IrvkR6800UosQjvfZ',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        this.snackBar.open(
          `The payment for transaction type ${transaction?.type}
          with order number ${transaction?.orderNumber} and amount ${transaction?.amount} TND has been processed successfully!`,
          'Close',
          { duration: 5000, panelClass: 'success-snackbar' }
        );
      },
      closed: () => {
        console.log('Payment window closed');
      },
    });
    if (handler)
       this.transactionService
        .checkRejected(transaction?.id)
        .subscribe((res) => {
          console.log(res);
          if (res) {
            transactionApproved = res;
            this.transactions[index] = transactionApproved;
          }
        });
    handler.open({
      name: 'Payment',
      description: `Payment for transaction type: ${transaction?.type}`,
      amount: transaction?.amount * 100,
    });
  }
  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        console.log('Stripe script loaded successfully'); // Vérification du chargement
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51QD7EKEQciJg6fdejdysNrjR0vydXih3oj29K7CLbADOSYjRJsLPg4pVRHpDoDbO95Q3utkwh50nf4cX0IrvkR6800UosQjvfZ',
          locale: 'auto',
          token: (token: any) => {
            console.log(token); // Vérifiez que le token est créé

            alert('Payment Success!!');
          },
        });
      };
      window.document.body.appendChild(s);
    } else {
      console.log('Stripe script already loaded'); // Script déjà chargé
    }
  }
}
