import { Component } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent {

  orderId: string | null | undefined;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderId = this.orderService.getOrderId();
  }

}
