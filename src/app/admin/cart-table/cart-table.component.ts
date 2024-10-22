import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

interface CartItem {
  id: string;
  name: string;
  price: string;
  size: string;
  imageSrc: string;
}

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css']
})
export class CartTableComponent implements OnInit {
  cartItems: CartItem[] = [];
  showModal = false; 
  selectedProduct: CartItem = { id: '', name: '', size: '', price: '', imageSrc: '' }; 

  constructor(private cartService: CartService, private toastr: ToastrService) {}

  ngOnInit() { 
    
    this.cartItems = this.cartService.getCartItems();
    document.addEventListener('keydown', this.handleKeyDown.bind(this)); // Handle keyboard events
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.showModal) {
      this.closeModal();
    }
  }
  
  removeFromCart(index: number) {
    if (confirm('Are you sure you want to remove this product?')) {
      const productId = this.cartItems[index].id; 
      this.cartService.removeCartItem(productId);
      this.cartItems = this.cartService.getCartItems(); 
      this.toastr.info('Product removed from cart', '', { timeOut: 2000 });
    }
  }

  openModal() {
    this.selectedProduct = { id: '', name: '', size: '', price: '', imageSrc: '' }; 
    this.showModal = true; 
  }

  editProduct(item: CartItem) {
    console.log('Editing product:', item); // Log the item being edited
    this.selectedProduct = { ...item };
    this.showModal = true; 
  }
  

  closeModal() {
    this.showModal = false; 
    this.selectedProduct = { id: '', name: '', size: '', price: '', imageSrc: '' };
  }

  updateProduct(updatedProduct: CartItem) {
  const index = this.cartItems.findIndex(item => item.id === updatedProduct.id);
  if (index !== -1) {
    this.cartItems[index] = updatedProduct;
  } else {
    this.cartItems.push(updatedProduct);
  }
  this.cartService.saveCartItems(this.cartItems);
}

}
