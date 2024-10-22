import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  getUserId(): string {
    throw new Error('Method not implemented.');
  }
  private cartKey = 'products'; 
  private cartCountSubject = new BehaviorSubject<number>(this.loadCartCount());
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {
    this.cartCount$.subscribe(count => this.saveCartCount(count));
  }

  // Update cart count methods
  updateCartCount(count: number) {
    this.cartCountSubject.next(count);
  }

  getCartCount(): number {
    return this.cartCountSubject.getValue();
  }

  private saveCartCount(count: number) {
    localStorage.setItem('cartCount', count.toString());
  }

  private loadCartCount(): number {
    const count = localStorage.getItem('cartCount');
    return count ? +count : 0;
  }
  
  clearCart() {
    this.cartCountSubject.next(0); 
  }

  // Cart item methods
  getCartItems(): any[] {
    return JSON.parse(localStorage.getItem(this.cartKey) || '[]');
  }

  removeCartItem(productId: string): void {
    let products = this.getCartItems();
    products = products.filter((item: any) => item.id !== productId);
    this.saveCartItems(products); // Save updated cart items
  }

  saveCartItems(products: any[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(products));
  }

  addCartItem(product: any): void {
    let products = this.getCartItems();
    products.push(product);
    this.saveCartItems(products); // Save updated cart items
  }
}
