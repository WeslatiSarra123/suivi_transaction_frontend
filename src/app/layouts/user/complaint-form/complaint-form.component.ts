import {Component, OnInit} from '@angular/core';
import {ComplaintService} from '../../../shared/services/complaint.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TransactionType} from '../../../shared/enumeration/TransactionType.enum';
import {User} from '../../../shared/model/user.types';
import {UserService} from '../../../shared/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'complaint-list-form',
  templateUrl: './complaint-form.component.html',
  styleUrl: './complaint-form.component.scss'
})
export class ComplaintFormComponent implements OnInit {
  complaintForm: FormGroup;
  transactionTypes = Object.values(TransactionType);
  agents: User[];


  constructor(private complaintService: ComplaintService,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private router: Router,
            private datePipe: DatePipe,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.complaintForm = this.fb.group({
      transactionDate: '',
      type: '',
      agentId: '',
      phoneNumber: [null, [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    })
    this.getAgents();
  }

  onSubmit() {
    console.log(this.complaintForm.value.transactionDate);
    if(this.complaintForm.value.transactionDate!=''){
      this.complaintForm.value.transactionDate = this.datePipe.transform(this.complaintForm.value.transactionDate, 'yyyy-MM-dd');

    }
console.log(this.complaintForm.value.transactionDate);

    this.complaintService.addComplaint(this.complaintForm.value).subscribe(() => {
      this.router.navigateByUrl('/user/dashboard')
      return this.snackBar.open("Complaint send successfully.", '', {duration: 5000});
    });

  }


  getAgents() {
    this.userService.getAgents().subscribe(res => {
      this.agents = res;
    })
  }
}
