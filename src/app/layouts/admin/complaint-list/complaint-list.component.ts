import {Component, OnInit} from '@angular/core';
import {Complaint} from '../../../shared/model/complaint.model';
import {ComplaintService} from '../../../shared/services/complaint.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Transaction} from '../../../shared/model/transaction.types';
import {TransactionService} from '../../../shared/services/transaction.service';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Component({
  selector: 'complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrl: './complaint-list.component.scss'
})
export class ComplaintListComponent implements OnInit {
  complaints: Complaint[] = [];
  errorMessage: string = '';
  complaintForm: FormGroup;
  editingIndex: number;
  transactions: Transaction[] = [];

  constructor(private complaintService: ComplaintService,
              private fb: FormBuilder,
              private transactionService: TransactionService,
              private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.complaintForm = this.fb.group({
      id: '',
      status:  ''
    })
    this.loadComplaints();
  }

  loadComplaints(): void {
    this.complaintService.getAll().subscribe((data) => {
      this.complaints = data;
    });
  }

  showDetail(targetModal: any, complaint: Complaint, index: number) {
    console.log(complaint)
    this.editingIndex = index;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.getTransaction(complaint);
    this.complaintForm.patchValue({
      id: complaint.id,
      status: complaint.status,
    });
  }

  getTransaction(complaint: Complaint) {
    const body = {
      date: new Date(complaint.transactionDate).toISOString().split('T')[0],
      type: complaint.type,
      orderNumber: ''
    }
    this.transactionService.searchTransactions(body).subscribe(res => {
      console.log(res)
      this.transactions = res;
    })
  }

  onSave() {
    this.complaintService.manageComplaint(this.complaintForm.value)
    .subscribe(res => {
      this.complaints[this.editingIndex] = res;
      this.modalService.dismissAll()
      console.log(res)

    })

  }
}
