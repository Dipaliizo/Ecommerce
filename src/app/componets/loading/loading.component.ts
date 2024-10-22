import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {


  isLoading = true;

  constructor() {
    // Simulate a loading process (replace with your actual loading logic)
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); // Remove the
}
}
