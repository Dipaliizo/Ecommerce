import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnDestroy {
  
  showLoader = false;
  subscription: Subscription;

  constructor(private loaderService: LoaderService) {
    
    this.subscription = this.loaderService.getLoaderObservable().subscribe(show => {
      this.showLoader = show;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  loaded = false;

  ngOnInit(): void {
    // You can add a timeout or a promise to wait for the page to load
    setTimeout(() => {
      this.loaded = true;
    }, 2000); // Replace with your loading logic
  }

}
