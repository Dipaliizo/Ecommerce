import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  userId: any; 
  orderId: string = ''; 
  orderItems: any[] = []; 
  shippingData: any;

  constructor(private route: ActivatedRoute,private orderService: OrderService) {}
 
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



