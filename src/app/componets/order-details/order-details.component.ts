import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  orderItems: any[] = [];
  filteredItems: any[] = [];
  userId: string = ''; 
  orderId: string = ''; 

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId')!;
      this.orderId = params.get('orderId')!;
      this.loadOrderItems();
    });
  }

  loadOrderItems() {
    const storedItems = localStorage.getItem('orderitems');
    if (storedItems) {
      this.orderItems = JSON.parse(storedItems);
      this.filterOrderItems();
    }
  }

  filterOrderItems() {
    this.filteredItems = this.orderItems.filter(item => 
      item.userId === this.userId && item.orderId === this.orderId
    );
  }
}



