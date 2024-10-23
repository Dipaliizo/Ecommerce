import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css'],
})
export class MyorderComponent implements OnInit {
  orders: any[] = [];
  userId: string | null = null;
  ordersWithItems: any[] = []; 
  orderId: string ='';

  constructor(private orderService: OrderService, private route: ActivatedRoute) {}
 
  getOrderLink() {
    return ['/orders', this.orderId, this.userId];
  }

  ngOnInit(): void {
    this.fetchUserOrders();
    this.loadOrderItems();
  }

  fetchUserOrders(): void {
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    if (loggedInUser) {
      this.userId = JSON.parse(loggedInUser).id;

      const storedOrders = localStorage.getItem('orders');
      if (storedOrders) {
        const orders = JSON.parse(storedOrders);
        this.orders = orders.filter((order: any) => order.userId === this.userId);
      }
    }
  }

  loadOrderItems() {
    const storedItems = localStorage.getItem('orderItems');
    if (storedItems) {
      const allItems = JSON.parse(storedItems);
      
      // Map items to orders based on orderId
      this.ordersWithItems = this.orders.map(order => {
        return {
          ...order,
          items: allItems.filter((item: { orderId: any; }) => item.orderId === order.orderId) 
        };
      });
    }
  }

  
}
