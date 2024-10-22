import { Component } from '@angular/core';
import { WishlistService } from '../../services/whislist.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-whislist',
  templateUrl: './whislist.component.html',
  styleUrl: './whislist.component.css'
})
export class WhislistComponent {
    wishlist: any[] = []; 
  router: any;
    constructor(private wishlistService: WishlistService,private cartService:CartService,private toastr: ToastrService) {}
  
    ngOnInit() {
      this.loadWishlist();
    }
  
    loadWishlist() {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (!loggedInUser) {
        this.wishlist = []; 
        return;
      }
    
      const userId = JSON.parse(loggedInUser).id;
      const storedWishlist = localStorage.getItem('wishlist');
      
      if (storedWishlist) {
        const allWishlistItems = JSON.parse(storedWishlist);
        this.wishlist = allWishlistItems.filter((item: any) => item.userId === userId);
      } else {
        this.wishlist = []; 
      }
    }
    
    removeFromWishlist(product: any): void {
      if (confirm('Are you sure you want to remove this product?')){
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (!loggedInUser) {
        alert('Please log in to manage your wishlist.');
        return;
      }
    
      const userId = JSON.parse(loggedInUser).id;
      let wishlistItems = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
      wishlistItems = wishlistItems.filter((item: any) => item.id !== product.id || item.userId !== userId);
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
      this.wishlist = wishlistItems.filter((item: any) => item.userId === userId); 
  
      if (this.wishlistService) {
        this.wishlistService.updateWishlistCount(this.wishlist.length);
      } else {
        console.error('WishlistService is not initialized');
      }
    
      console.log('Wishlist length after removal:', this.wishlist.length);
      this.toastr.info('product remove from your wishlist','',{timeOut:2000});
      console.log('Updated wishlist:', this.wishlist);
    }
    }
    

 // Add product to the cart 
addToCart(product: any): void {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const userId = JSON.parse(loggedInUser).id;

      if (!Array.isArray(cart)) {
          cart = [];
      }
      const existingItem = cart.find((item: { id: any; userId: string; }) => item.id === product.id && item.userId === userId);

      if (existingItem) {
          existingItem.quantity++;
      } else {
          cart.push({ ...product, userId: userId, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartService.updateCartCount(cart.filter((item: { userId: string; }) => item.userId === userId).reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0));
      console.log('Product added to cart:', product);
      this.toastr.success('product addrd in your cart','',{timeOut:2000});
      product.addedToCart = true;
      setTimeout(() => {
        product.addedToCart = false;
    }, 2000);

  } else {
      alert('Please log in first to add products to the cart.');
      this.router.navigate(['signin']);
  }
}
    
  }
  
