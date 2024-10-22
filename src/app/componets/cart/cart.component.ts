import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  constructor(private router: Router, private cartService: CartService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const userId = JSON.parse(loggedInUser).id;
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const cart = JSON.parse(storedCart);
        this.cartItems = cart.filter((item: { userId: any; }) => item.userId === userId) || [];
        this.calculateTotal();
      }
    }
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  updateQuantity(index: number): void {
    this.cartItems[index].quantity = Math.max(1, parseInt(this.cartItems[index].quantity, 10));
    this.calculateTotal();
    this.saveCart();
  }

  decrementQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.updateQuantity(index);
    } else {
      this.removeFromCart(index);
    }
  }
  
  incrementQuantity(index: number): void {
    this.cartItems[index].quantity++;
    this.updateQuantity(index);
  }

  removeFromCart(index: number): void {
    if (confirm('Are you sure you want to remove this product?')){
    this.cartItems.splice(index, 1);
    this.calculateTotal();
    this.saveCart();
    this.cartService.updateCartCount(this.cartItems.length);
    this.toastr.info('','product remove from your cart',{timeOut:2000});
  }
}

  private saveCart(): void {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const userId = JSON.parse(loggedInUser).id;
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart = cart.filter((item: { userId: any; }) => item.userId !== userId).concat(this.cartItems);
      localStorage.setItem('cart', JSON.stringify(cart));
    
    }
  }
}
