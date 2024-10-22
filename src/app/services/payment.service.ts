import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  totalAmount: number = 0;
  transactionID: any;

  setTotalAmount(amount: number) {
    this.totalAmount = amount;
  }

  getTotalAmount() {
    return this.totalAmount;
  }
  orderId: string = '';

  private stripe: Stripe | null = null;

  constructor() {
    this.initStripe();
  }

  private async initStripe() {
    this.stripe = await loadStripe('pk_test_Eit2Rw9PIiAX3uvAHSR1ruhq');
  }

  getStripe(): Stripe | null {
    return this.stripe;
  }

  
}


