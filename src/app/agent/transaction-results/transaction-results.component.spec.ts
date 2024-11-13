import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionResultsComponent } from './transaction-results.component';

describe('TransactionResultsComponent', () => {
  let component: TransactionResultsComponent;
  let fixture: ComponentFixture<TransactionResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
