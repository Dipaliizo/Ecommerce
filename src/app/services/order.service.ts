import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  getOrderId(): string | null {
    return localStorage.getItem('orderId'); 
  }


  getOrderItems(orderId: string, userId: string): any[] {
    const orderItems = JSON.parse(localStorage.getItem('orderItems') || '[]');

    if (Array.isArray(orderItems)) {
      return orderItems.filter(item => item.orderId === orderId && item.userId === userId);
    }

    return [];
  }
}
