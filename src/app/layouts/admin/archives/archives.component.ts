import {Component, OnInit} from '@angular/core';
import {Complaint} from '../../../shared/model/complaint.model';
import {ComplaintService} from '../../../shared/services/complaint.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'archives',
  templateUrl: './archives.component.html',
  styleUrl: './archives.component.scss'
})
export class ArchivesComponent implements OnInit {
  complaints: Complaint[] = [];
  errorMessage: string = '';
  complaintForm: FormGroup;

  constructor(private complaintService: ComplaintService,
              private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.complaintForm = this.fb.group({
      id: '',
      status: ''
    })
    this.loadComplaints();
  }

  loadComplaints(): void {
    this.complaintService.findAll("APPROVED,REJECTED").subscribe((data) => {
      this.complaints = data;
    });
  }
}
