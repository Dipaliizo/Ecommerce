import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/whislist.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products: any[] = [];
  cart: any[] = [];
  wishlist: any[] = [];
  isLoggedIn = false; 
  // private router = inject(Router);
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);
  
  constructor(private toastr: ToastrService,private router:Router) {}

  ngOnInit() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
    } else {
      // If no products in local storage, make sure to keep the static products
      this.products = [
        { id: 1, name: 'Soya Flour', size: '500g', price: 150, imageSrc: 'assets/product/51IgUHnnwEL._AC_UL480_FMwebp_QL65_.webp', isInWishlist: false },
        { id: 2, name: 'Jowar Flour', size: '500g', price: 180, imageSrc: 'assets/product/Jowar_Flour_F-min.webp', isInWishlist: false },
        { id: 3, name: 'Besan Flour', size: '1kg', price: 210, imageSrc: 'assets/product/Beasn_Flour_F-min.webp', isInWishlist: false },
        { id: 4, name: 'Ragi Flour', size: '1kg', price: 250, imageSrc: 'assets/product/Ragi_Flour_F-min_1.webp', isInWishlist: false }
      ];
    }
    
    this.loadCart();
    this.loadWishlist();
    this.updateProductWishlistStatus();
  }
  
  loadCart(): void {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const cart = JSON.parse(storedCart);
            this.cart = cart.filter((item: { userId: string; }) => item.userId === JSON.parse(loggedInUser).id) || [];
            this.cartService.updateCartCount(this.cart.reduce((total, item) => total + item.quantity, 0)); 
        }
    }
  }
isInCart(product: any): boolean {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const cart = JSON.parse(storedCart);
            return cart.some((item: { id: any; userId: string; }) => item.id === product.id && item.userId === JSON.parse(loggedInUser).id);
        }
    }
    return false;
}
handleButtonClick(product: any): void {
    if (this.isInCart(product)) {
        this.router.navigate(['/cart']);
    } else {
        this.addToCart(product);
        this.router.navigate(['/shop']);
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
        this.toastr.success('product added in your cart','',{timeOut:2000});
        product.addedToCart = true;

    } else {
        console.log('User is not logged in. Navigating to sign-in page...');
        this.toastr.error('Please log in first to add products to the cart.','',{timeOut:2000});
        setTimeout(() => {
          this.router.navigate(['signin']);
      }, 0);
    }
}
 
loadWishlist() {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      this.wishlist = JSON.parse(storedWishlist);
      const userId = JSON.parse(loggedInUser).id;
      this.wishlist = this.wishlist.filter(item => item.userId === userId);
      this.wishlistService.updateWishlistCount(this.wishlist.length);
    }
  }
}

updateProductWishlistStatus() {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    const userId = JSON.parse(loggedInUser).id;
    this.products.forEach(product => {
      product.isInWishlist = this.wishlist.some(wishItem => wishItem.id === product.id && wishItem.userId === userId);
    });
  }
}

addToWishlist(product: any): void {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    this.toastr.error('Please log in first to manage the wishlist.','',{timeOut:2000});
    this.router.navigate(['signin']);
    return;
  }

  const userId = JSON.parse(loggedInUser).id;
  const wishlistItems = JSON.parse(localStorage.getItem('wishlist') || '[]');

  const existingItemIndex = wishlistItems.findIndex((item: any) => item.id === product.id && item.userId === userId);

  if (existingItemIndex === -1) {
    wishlistItems.push({ ...product, userId: userId });
    product.isInWishlist = true;
    this.toastr.success('product saved in your wishlist','',{timeOut:2000});
  } else {
    wishlistItems.splice(existingItemIndex, 1);
    product.isInWishlist = false;
    this.toastr.info('product remove from your wishlist','',{timeOut:2000});
  }

  localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  this.wishlistService.updateWishlistCount(wishlistItems.filter((item: { userId: string; }) => item.userId === userId).length)
  console.log('Wishlist updated:', wishlistItems);
}

clearWishlist() {
  localStorage.removeItem('wishlist');
  this.wishlistService.clearWishlist(); 
  this.wishlist = [];

}

}
