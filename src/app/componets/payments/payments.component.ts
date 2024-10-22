import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {
  amount = 0;
  orderId: string = '';

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  constructor(
    private router: Router,
    private payment: PaymentService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.amount = this.payment.getTotalAmount();
    this.orderId = this.route.snapshot.params['orderId']; 
    console.log('Route parameters:', this.route.snapshot.params); 
    console.log('Order ID:', this.orderId); 

    if (!this.orderId) {
      console.error('No order ID provided!');
      return;
    }

    window.paypal.Buttons({
      style: {
        layout: 'horizontal',
        color: 'blue',
        shape: 'rect',
        label: 'paypal',
      },
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.amount.toString(),
              currency_code: 'USD',
            },
          }],
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          console.log(details);
          if (details.status === 'COMPLETED') {
            const loggedInUser = localStorage.getItem('loggedInUser');
            const userId = loggedInUser ? JSON.parse(loggedInUser).id : null;

            const orderDetails = {
              transactionID: details.id,
              amount: this.amount,
              status: details.status,
              date: details.create_time,
              payer: details.payer.name.given_name,
              userId: userId,
              orderId: this.orderId, 
            };

            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
              localStorage.removeItem('cart'); 

              const existingOrders = JSON.parse(localStorage.getItem('transactionData') || '[]');
              existingOrders.push(orderDetails); 
              localStorage.setItem('transactionData', JSON.stringify(existingOrders));

              console.log('Stored transaction data:', localStorage.getItem('transactionData'));
            }

            this.router.navigate(['success']);
            this.cartService.updateCartCount(0);
          }
        });
      },
      onError: (error: any) => {
        console.log(error);
      },
    }).render(this.paymentRef.nativeElement);
  }

  cancel() {
    this.router.navigate(['cart']);
  }
}
