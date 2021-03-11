import { Component, OnInit } from '@angular/core';
import { SavedPayment } from './savedpayment';
import { PaymentsService } from './payments.service';

@Component({
  selector: 'app-method',
  templateUrl: './method.component.html',
  styleUrls: ['./method.component.css']
})
export class MethodComponent implements OnInit {

  payments: SavedPayment[];

  constructor(private paymentsService:PaymentsService) { }

  ngOnInit(): void {
    this.paymentsService.getPayments().subscribe(
      payments => this.payments = payments
    );
  }

}
