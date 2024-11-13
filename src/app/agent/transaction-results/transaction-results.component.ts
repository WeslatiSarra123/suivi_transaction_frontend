import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../component/dashboard/dashboard.component';
import { TransactionService } from '../transaction.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transaction-results',
  templateUrl: './transaction-results.component.html',
  styleUrl: './transaction-results.component.scss'
})
export class TransactionResultsComponent {
  transactions: Transaction[] = [];
  transaction : Transaction;
  errorMessage: string = '';
  isPayNowEnabled: boolean = false;

  constructor(private transactionService: TransactionService, private router: Router, 
    private http: HttpClient ) {}
     handler:any = null ; 

  ngOnInit(): void {
    // Vous devez probablement passer les transactions via le service ou le routeur
    this.transactions = this.transactionService.getStoredTransactions();
    this.loadStripe();
  }

  checkTransactionStatus(transactionId: number) {
    this.http.get('http://localhost:8080/transactions/check-status/' + transactionId, { responseType: 'text' }).subscribe({
      next: (message) => {
        alert(message); // Affiche le message dans une alerte
        if (message.includes("There is an issue")) {
          this.isPayNowEnabled = true; // Active le bouton si le message indique qu'il y a un problème
        } else if (message.includes("There are no issues with this transaction.")) {
          this.isPayNowEnabled = false; // Désactive le bouton si le message indique qu'il n'y a pas de problème
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'An error occurred while checking the transaction status.';
        alert(this.errorMessage);
        this.isPayNowEnabled = false; // Désactive le bouton en cas d'erreur
      }
    });
  }
  payNow(amount: number, type: string, orderNumber: string) {
    alert(`Initiating payment process for amount: ${amount} TND`);
    var handler = (<any>window).StripeCheckout.configure({
      key:'pk_test_51QD7EKEQciJg6fdejdysNrjR0vydXih3oj29K7CLbADOSYjRJsLPg4pVRHpDoDbO95Q3utkwh50nf4cX0IrvkR6800UosQjvfZ',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        alert(`The payment for transaction type ${type} with order number ${orderNumber} and amount ${amount} TND has been processed successfully!`);
      },
      closed: () => {
        console.log('Payment window closed');}
    });
 
    handler.open({
      name: 'Payment',
      description: `Payment for transaction type: ${type}`,
      amount: amount * 100, 
      
    });
 
  }
  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
        var s = window.document.createElement("script");
        s.id = "stripe-script";
        s.type = "text/javascript";
        s.src = "https://checkout.stripe.com/checkout.js";
        s.onload = () => {
            console.log('Stripe script loaded successfully'); // Vérification du chargement
            this.handler = (<any>window).StripeCheckout.configure({
                key:'pk_test_51QD7EKEQciJg6fdejdysNrjR0vydXih3oj29K7CLbADOSYjRJsLPg4pVRHpDoDbO95Q3utkwh50nf4cX0IrvkR6800UosQjvfZ',
                locale: 'auto',
                token: (token: any) => {
                    console.log(token); // Vérifiez que le token est créé
                    alert('Payment Success!!');
                }
            });
        };
        window.document.body.appendChild(s);
    } else {
        console.log('Stripe script already loaded'); // Script déjà chargé
    }
}

  
  
}

  
  
