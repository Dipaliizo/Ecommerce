//add to cart product with userid

// loadCart() {
//     const loggedInUser = localStorage.getItem('loggedInUser');
//     if (loggedInUser) {
//       const userId = JSON.parse(loggedInUser).userid;
//       const storedCart = localStorage.getItem('cart');
//       if (storedCart) {
//         const cart = JSON.parse(storedCart);
//         this.cart = cart[userId] || [];
//         this.cartService.updateCartCount(this.cart.length);
//       }
//     }
//   }
  
//   isInCart(product: any): boolean {
//     const loggedInUser = localStorage.getItem('loggedInUser');
//     if (loggedInUser) {
//       const userId = JSON.parse(loggedInUser).userid;
//       const storedCart = localStorage.getItem('cart');
//       if (storedCart) {
//         const cart = JSON.parse(storedCart);
//         const userCart = cart[userId] || [];
//         return userCart.some((item: { product: any; }) => item.product.id === product.id);
//       }
//     }
//     return false;
//   }
  
//   handleButtonClick(product: any): void {
//     if (this.isInCart(product)) {
//       this.router.navigate(['/cart']);
//     } else {
//       this.addToCart(product);
//       this.router.navigate(['/shop']);
//     }
//   }
  
  // Add product to cart
//   addToCart(product: any): void {
//     const loggedInUser = localStorage.getItem('loggedInUser');
//     if (loggedInUser) {
//       const userId = JSON.parse(loggedInUser).userid;
//       let cart = JSON.parse(localStorage.getItem('cart') || '{}');
      
//       if (!cart[userId]) {
//         cart[userId] = [];
//       }
  
//       let cartItems = cart[userId];
//       const existingItem = cartItems.find((item: { product: any; }) => item.product.id === product.id);
  
//       if (existingItem) {
//         existingItem.quantity++;
//       } else {
//         cartItems.push({ product, quantity: 1 });
//       }
  
//       localStorage.setItem('cart', JSON.stringify(cart));
//       this.cartService.updateCartCount(cartItems.length);
//       console.log('Product added to cart:', product);
//       product.addedToCart = true;
  
//     } else {
//       alert('Please log in first to add products to the cart.');
//       this.router.navigate(['login']);
//     }
//   }



  // addToWishlist(product: any): void {
  //   if (sessionStorage.getItem('loggedInUser')) {
  //     const wishlistItems = JSON.parse(sessionStorage.getItem('wishlist') || '[]');
  //     const existingItemIndex = wishlistItems.findIndex((item: any) => item.id === product.id);
  //     if (existingItemIndex === -1) {
  //       // add in wishlist
  //       wishlistItems.push(product);
  //       product.isInWishlist = true;
  //     } else {
  //       // remove from wishlist
  //       wishlistItems.splice(existingItemIndex, 1);
  //       product.isInWishlist = false;
  //     }
  //     sessionStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  //     const wishlistCount = this.wishlist.length;

  //     this.wishlistService.updateWishlistCount(wishlistItems.length);
  //     console.log('Wishlist updated:', wishlistItems);
  //   } else {
  //     alert('Please log in first to manage the wishlist.');
  //     this.router.navigate(['login']);
  //   }
  // }


    // addProductToWishlist(product: any): void {

  //   const wishlistItems = JSON.parse(localStorage.getItem('wishlist') || '[]');
  //   wishlistItems.push(product);
  //   product.isInWishlist = true;
  //   localStorage.setItem('wishlist', JSON.stringify(wishlistItems));

  //   this.wishlistService.updateWishlistCount(wishlistItems.length);
  
  //   console.log('Product added to wishlist:', wishlistItems);
  // }
 
  // removeProductFromWishlist(product: any): void {
  //   const wishlistItems = JSON.parse(localStorage.getItem('wishlist') || '[]');
  //   const existingItemIndex = wishlistItems.findIndex((item: any) => item.id === product.id);
  
  //   if (existingItemIndex !== -1) {
  //     wishlistItems.splice(existingItemIndex, 1);
  //     product.isInWishlist = false;
  //     localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  //     this.wishlistService.updateWishlistCount(wishlistItems.length);
  //     console.log('Product removed from wishlist:', wishlistItems);
  //   }
  // }
  
  // addToWishlist(product: any): void {
  //   if (localStorage.getItem('loggedInUser')) {
  //     const wishlistItems = JSON.parse(localStorage.getItem('wishlist') || '[]');
  //     const existingItemIndex = wishlistItems.findIndex((item: any) => item.id === product.id);
  
  //     if (existingItemIndex === -1) {
  //       this.addProductToWishlist(product);
  //     } else {
  //       // Product is already in the wishlist, remove it
  //       this.removeProductFromWishlist(product);
  //     }
  //   } else {
  //     alert('Please log in first to manage the wishlist.');
  //     this.router.navigate(['login']);
  //   }
  // }


    // ngOnInit(): void {
  //   this.authService.user$.subscribe(user => {
  //     if (user) {
  //       this.isLoggedIn = true;
  //       this.name = user.name;
  //       this.email = user.email;
  //       this.userProfileImg = user.picture; 
  //     } else {
  //       this.isLoggedIn = false;
  //     }
  //   });
  // }


   // ngAfterViewInit(){
  //   this.cartService.cartCount$.subscribe(count => {
  //     this.cartCount = count;
  //   });

  //   this.wishlistService.wishlistCount$.subscribe(count => {
  //     this.wishlistCount = count;
  //   });
  // }

    // toggleDropdown() {
  //   this.showDropdown = !this.showDropdown;
  // }

//   <div *ngIf="errorMessage" class="mt-4 text-red-500 text-sm">
//   {{ errorMessage }}
// </div>

// } else {
//   this.errorMessage = 'Passwords do not match.';
// }
// } else {
// this.errorMessage = 'No user found with the provided email address.';
// }




// loadWishlist() {
//   const userId = localStorage.getItem('loggedInUser');
//   if (userId) {
//     this.wishlist = this.wishlistService.getWishlist(userId);
//     this.wishlistService.updateWishlistCount(userId, this.wishlist.length);
//   }
// }

// updateProductWishlistStatus(products: any[]) {
//   const userId = localStorage.getItem('loggedInUser');
//   if (userId) {
//     products.forEach(product => {
//       product.isInWishlist = this.wishlistService.getWishlist(userId).some((wishItem: { product: { id: any; }; }) => wishItem.product.id === product.id);
//     });
//   }
// }

// addToWishlist(product: any): void {
//   const userId = localStorage.getItem('loggedInUser');
//   if (!userId) {
//     alert('Please log in first to manage the wishlist.');
//     this.router.navigate(['signup']);
//     return;
//   }

//   this.wishlistService.addToWishlist(userId, product);
// }

// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class WishlistService {

//   private wishlist: any = {};
//   private wishlistCountSubject = new BehaviorSubject<number>(this.loadWishlistCount());
//   wishlistCount$ = this.wishlistCountSubject.asObservable();

//   constructor() {
//     this.wishlistCount$.subscribe(count => this.saveWishlistCount(count));
//   }

//   updateWishlistCount(userId: string, count: number) {
//     this.wishlistCountSubject.next(count);
//   }

//   getWishlistCount(): number {
//     return this.wishlistCountSubject.getValue();
//   }

//   getWishlist(userId: string) {
//     return this.wishlist[userId] || [];
//   }

//   addToWishlist(userId: string, product: any): void {
//     if (!this.wishlist[userId]) {
//       this.wishlist[userId] = [];
//     }

//     let wishlistItems = this.wishlist[userId];
//     const existingItemIndex = wishlistItems.findIndex((item: any) => item.product.id === product.id);

//     if (existingItemIndex === -1) {
//       wishlistItems.push({ product });
//     } else {
//       wishlistItems.splice(existingItemIndex, 1);
//     }

    // Update localStorage and wishlist count
    // localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    // this.updateWishlistCount(userId, wishlistItems.length);

    // Log the updated wishlist
//     console.log(`Wishlist updated for user ${userId}:`, wishlistItems);
//   }

//   private saveWishlistCount(count: number) {
//     localStorage.setItem('wishlistCount', count.toString());
//   }

//   private loadWishlistCount(): number {
//     const count = localStorage.getItem('wishlistCount');
//     return count ? +count : 0;
//   }

//   clearWishlist(userId: string) {
//     this.wishlist[userId] = [];
//     this.updateWishlistCount(userId, 0); // Reset count to 0
//   }
// }




// <br>
// <ngx-paypal [config]="payPalConfig"></ngx-paypal>

// this.initConfig();

// public payPalConfig?: IPayPalConfig;

//   private initConfig(): void {
//     this.payPalConfig = {
//     currency: 'EUR',
//     clientId: 'AQk27XA0umiX2eJrcwcv5CA5LynK69b8vH1xOzH_V0-PvZaIjI525GVANBwLiyQiaTSkPWsTXjGjrGpH',
//     createOrderOnClient: (data) => <ICreateOrderRequest>{
//       intent: 'CAPTURE',
//       purchase_units: [
//         {
//           amount: {
//             currency_code: 'EUR',
//             value: `${this.total}`,
//             breakdown: {
//               item_total: {
//                 currency_code: 'EUR',
//                 value: `${this.total}`,
//               },
//             },
//           },
//           items: [
//             {
//               name: 'Enterprise Subscription',
//               quantity: '1',
//               category: 'DIGITAL_GOODS',
//               unit_amount: {
//                 currency_code: 'EUR',
//                 value:`${this.total}`,
//               },
//             }
//           ]
//         }
//       ]
//     },
//     advanced: {
//       commit: 'true'
//     },
//     style: {
//       label: 'paypal',
//       layout: 'vertical'
//     },
//     onApprove: (data, actions) => {
//       console.log('onApprove - transaction was approved, but not authorized', data, actions);
//       actions.order.get().then((details: any) => {
//         console.log('onApprove - you can get full order details inside onApprove: ', details);
//       });
    
//     },
//     onClientAuthorization: (data) => {
//       console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
//       this.showSuccess = true;
     
//       const loggedInUser = localStorage.getItem('loggedInUser');
//       if (loggedInUser) {
//         const userId = JSON.parse(loggedInUser).id;
//         const storedCart = localStorage.getItem('cart');
//         if (storedCart) {
//           const cart = JSON.parse(storedCart);
//           delete cart[userId];
//           localStorage.setItem('cart', JSON.stringify(cart));
//           this.router.navigate(['success']);
//           this.cartService.updateCartCount(0); 
//         }
//       }
//     },
//     onCancel: (data, actions) => {
//       console.log('OnCancel', data, actions);
//     },
//     onError: err => {
//       console.log('OnError', err);
//     },
//     onClick: (data, actions) => {
//       console.log('onClick', data, actions);
//     },
//   };
//   }