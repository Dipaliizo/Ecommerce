import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationFrameScheduler } from 'rxjs/internal/scheduler/AnimationFrameScheduler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  isOpen = true;
  isAdminLoggedIn: boolean = false;

  constructor(private router: Router ) { }

  isCurrentRoute(route: string): boolean {
    return this.router.url.includes(route);
}


  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    localStorage.removeItem('isAdminLoggedIn');
    this.isAdminLoggedIn = false; 
    this.router.navigate(['home']);
  }
}
