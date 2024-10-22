import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlistCountSubject = new BehaviorSubject<number>(this.loadWishlistCount());
  wishlistCount$ = this.wishlistCountSubject.asObservable();

  constructor() {
    this.wishlistCount$.subscribe(count => this.saveWishlistCount(count));
  }

  updateWishlistCount(count: number) {
    this.wishlistCountSubject.next(count);
  }

  getWishlistCount(): number {
    return this.wishlistCountSubject.getValue();
  }

  private saveWishlistCount(count: number) {
    localStorage.setItem('wishlistCount', count.toString());
  }

  private loadWishlistCount(): number {
    const count = localStorage.getItem('wishlistCount');
    return count ? +count : 0;
  }

  clearWishlist() {
    this.wishlistCountSubject.next(0); 
  }
}
