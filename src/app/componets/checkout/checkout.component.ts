import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { PaymentService } from '../../services/payment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  shippingAddress: string = '';
  country: any;
  saveInformation: boolean = false;
  cartItems: any[] = [];
  showSuccess !:any;
  showBillingAddress = false;
  billingFirstName = '';
billingLastName = '';
billingAddress = '';
billingApartment = '';
billingCity = '';
billingState = '';
billingPinCode = '';
billingPhone = '';
orderId: string ='';
orderDate: string='';
orderStatus: string='';
userId: string='';

firstName: string = '';
lastName: string = '';
address: string = '';
apartment: string = '';
city: string = '';
state: string = '';
pinCode: string = '';
phone: string = '';
saveData: boolean = false;
errorMessage: string = '';

ngAfterViewInit(): void {
  this.loadData();
}

loadData(): void {
  const savedData = localStorage.getItem('shippingData');
  if (savedData) {
    const data = JSON.parse(savedData);
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.address = data.address || '';
    this.apartment = data.apartment || '';
    this.city = data.city || '';
    this.state = data.state || '';
    this.pinCode = data.pinCode || '';
    this.phone = data.phone || '';
    this.saveData = data.saveData || true;
  }
}

saveDataToLocalStorage(): void {
  if (this.saveData) {
    const shippingData = {
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      apartment: this.apartment,
      city: this.city,
      state: this.state,
      pinCode: this.pinCode,
      phone: this.phone,
      userId: this.userId, 
      saveData: this.saveData
    };
    localStorage.setItem('shippingData', JSON.stringify(shippingData));
  } else {
    localStorage.removeItem('shippingData');
  }
}

  paymentMethod: string = 'card';

  navigateToPayment(): void {
    if (this.paymentMethod === 'paypal') {
      this.router.navigate(['/payments']);
      this.saveOrderToLocalStorage(); 
    } else {
      this.router.navigate(['/payment', this.orderId, this.userId]);
      this.saveOrderToLocalStorage(); 
    }
  }
  
  setPaymentMethod(method: string): void {
    this.paymentMethod = method;
  }
  
  // Product details
  product: any = {
    name: '',
    price: 0
  };
  quantity: number = 1;
  subtotal: number = 0;
  total: number = 0;
 
  constructor(private router: Router, private paymentService: PaymentService,private cartService: CartService,private toastr: ToastrService) { }


  ngOnInit(): void {
    this.loadCart();
    this.calculateTotal();
    this.userId = this.cartService.getUserId();
  }

  private loadCart(): void {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const userId = JSON.parse(loggedInUser).id;
      this.userId = userId;
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const cart = JSON.parse(storedCart);
        this.cartItems = cart.filter((item: any) => item.userId === userId) || [];
      }
    }
  }

  calculateTotal(): void {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.total = this.subtotal + 10;
    this.paymentService.setTotalAmount(this.total);
  }

  generateOrderId() {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 1000).toString();
    this.orderId = `${timestamp}-${randomNum}`;

  
    this.orderDate = new Date().toLocaleString();
    this.orderStatus = 'Pending';
  }

  saveOrderToLocalStorage() {
    const shippingData = JSON.parse(localStorage.getItem('shippingData') || '{}');
    const order = {
      orderId: this.orderId,
      date: this.orderDate,
      status: this.orderStatus,
      payer: `${shippingData.firstName}`,
      userId: this.userId,
      paymentMethod: this.paymentMethod // Store the payment method
    };
  
    // Save the order information
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
  
    const existingOrderItems = JSON.parse(localStorage.getItem('orderItems') || '[]');
    
    const orderItemsWithDetails = this.cartItems.map(item => ({
      ...item,
      orderId: this.orderId,
      totalAmount: this.total
    }));
  
    existingOrderItems.push(...orderItemsWithDetails);
    localStorage.setItem('orderItems', JSON.stringify(existingOrderItems));
  }
  

  navigateToConfirm() {
    if (this.validateDeliveryForm()){
    this.generateOrderId(); 
    this.saveOrderToLocalStorage(); 
    console.log('Order ID:', this.orderId); 

    if (this.paymentMethod === 'cod') {
      localStorage.removeItem('cart');
      this.cartService.clearCart();
      this.router.navigate(['/success']);
    } else if (this.paymentMethod === 'card') {
      this.router.navigate(['/payment', this.orderId, this.userId]);
    } else if (this.paymentMethod === 'paypal') {
      this.router.navigate(['payments', this.orderId]); 
    }
  }
  }
  
  validateDeliveryForm(): boolean {
    if (!this.firstName || !this.lastName || !this.address || !this.city || !this.state || !this.pinCode || !this.phone) {
      this.errorMessage = 'Please fill in all required delivery fields.';
      this.scrollToError();
      return false;
    }
    this.errorMessage = ''; 
    return true;
  }
  
  scrollToError() {
    setTimeout(() => {
      const errorElement = document.getElementById('error-message');
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 0);
  }
  
  
  

}
 
