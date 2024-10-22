import { Component, ElementRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

interface Product {
  id: string;
  name: string;
  size: string;
  price: string;
  imageSrc: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product = { id: '', name: '', size: '', price: '', imageSrc: '' };
  @Output() productUpdated = new EventEmitter<Product>(); // Corrected here

  // Other properties
  errorMessage: string = '';
  imageErrorMessage: string = '';

  constructor(private toastr: ToastrService, private elementRef: ElementRef, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Your existing logic for initializing the product
  }

  onCancel(): void {
    this.elementRef.nativeElement.remove();
    this.router.navigate(['cartTable']);
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.product.imageSrc = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (!this.product.imageSrc) {
      this.imageErrorMessage = 'Product image is required.'; 
      return; 
    }

    // Retrieve existing products from local storage
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    
    if (this.product.id) {
      // Update existing product
      const index = products.findIndex((p: any) => p.id === this.product.id);
      if (index !== -1) {
        products[index] = this.product; // Update the product details
      }
    } else {
      // Generate a unique UUID for the new product
      this.product.id = uuidv4();
      products.push(this.product); // Add new product
    }

    localStorage.setItem('products', JSON.stringify(products));
    this.toastr.success('Product added/updated in cart', '', { timeOut: 2000 });
    this.productUpdated.emit(this.product); // Emit the updated product
    this.resetProduct();
    this.onCancel();
  }

  resetProduct() {
    this.product = { id: '', name: '', size: '', price: '', imageSrc: '' }; // Reset the product form
    this.errorMessage = '';
    this.imageErrorMessage = '';
  }

  validatePrice(event: any) {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9.]/g, ''); // Allow only numbers and dots
    event.target.value = numericValue;
    this.product.price = numericValue;
  }

  
}
