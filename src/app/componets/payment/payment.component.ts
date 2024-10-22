import { Component } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { CartService } from '../../services/cart.service';
import { StripeElementStyle } from '@stripe/stripe-js';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'] 
})
export class PaymentComponent {
  card: any; 
  stripe: any;
  amount = 0;
  storedItems: any;
  userId: any; 
  orderId: string = ''; 
  orderItems: any[] = []; 
  shippingData: any; 
  
  constructor(
    private payment: PaymentService, 
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  ngAfterViewInit() {
    this.stripe = this.payment.getStripe();
    this.amount = this.payment.getTotalAmount();
    const elements = this.stripe.elements();

    const style: StripeElementStyle = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '0.025em',
        padding: '10px',
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };
    
    this.card = elements.create('card', { style });
    this.card.mount('#card-element');
  }

  async pay() {
    const { error, paymentMethod } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.card,
    });
  
    if (error) {
      console.error('Payment error:', error);
    } else {
      console.log('Payment Method created:', paymentMethod);
      
      const transactionData = {
        transactionId: paymentMethod.id,
        paymentType: paymentMethod.card.brand,
        date: new Date().toISOString(), 
        userId: this.userId, 
        status: 'COMPLETED', 
        payer: 'John', 
        amount: this.amount,
        orderId: this.orderId 
      };
  
    
      const existingTransactions = JSON.parse(localStorage.getItem('transactionData') || '[]');
  
      existingTransactions.push(transactionData);
  
      localStorage.setItem('transactionData', JSON.stringify(existingTransactions));
  
      localStorage.removeItem('cart');
      this.cartService.clearCart();
      this.router.navigate(['success']);
    }
  }
  

  loadShippingData(): void {
    const data = localStorage.getItem('shippingData');
    if (data) {
      this.shippingData = JSON.parse(data);
      console.log('Shipping data loaded:', this.shippingData);
    }
  }

  ngOnInit(): void {
    this.loadShippingData(); 
    this.orderId = this.route.snapshot.params['orderId']; 
    this.userId = this.route.snapshot.params['userId'];   
    this.orderItems = this.orderService.getOrderItems(this.orderId, this.userId);
    console.log(this.orderItems);
  }
}
