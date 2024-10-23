import { ChangeDetectorRef, Component, ElementRef, HostListener, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/whislist.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isMenuVisible =false;
  showDropdown = false;
  isLoggedIn = false;
  isAdminLoggedIn: boolean = false;
  constructor(private authService: AuthService,private renderer: Renderer2,private userService: UserService,private router: Router, private cdr: ChangeDetectorRef) { }
  // name = '';
  // photoUrl= '';
  // email = '';

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  cartCount: number = 0;
  wishlistCount: number = 0;

  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);


  name: string = '';
  email: string = '';
  photoUrl: string = '';

  ngOnInit(): void {
    this.userService.userData$.subscribe(data => {
      if (data) {
        this.name = data.name;
        this.email = data.email;
        this.photoUrl = data.photoUrl;
        this.isLoggedIn = true;
      } else {
        this.name = '';
        this.email = '';
        this.photoUrl = '';
        this.isLoggedIn = false;
      }
    });
  
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  
    this.wishlistService.wishlistCount$.subscribe(count => {
      this.wishlistCount = count;
    });
  }

  ngAfterViewInit() {
    this.isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  }

  logout() {
    localStorage.removeItem('isAdminLoggedIn');
    this.isAdminLoggedIn = false; 
    this.router.navigate(['home']);
  }
  

  signOut(): void {
    this.authService.signOut(); 
    localStorage.removeItem('loggedInUser');
    this.userService.updateUserData(null); 
    this.cartService.clearCart();        
    this.wishlistService.clearWishlist();  
    this.router.navigate(['home']); 
    this.cdr.detectChanges();     
  }
  
  
  dropdownPosition = {};
  @ViewChild('profileButton') profileButton!: ElementRef;
  
  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown) {
      this.updateDropdownPosition();
    }
  }
  
  updateDropdownPosition(): void {
    const { bottom, left, width } = this.profileButton.nativeElement.getBoundingClientRect();
    const dropdownWidth = 200;
  
    this.dropdownPosition = {
      position: 'absolute',
      top: `${bottom}px`,
      left: `${left + (width / 2) - (dropdownWidth / 2)}px`
    };
  }
  
  
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent): void {
    if (this.showDropdown && this.profileButton && !this.profileButton.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }
  
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }  
  
}