import { Injectable } from '@angular/core';
import { flush } from '@angular/core/testing';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private loadingSubject = new Subject<boolean>();
  loadingAction$ = this.loadingSubject.asObservable();

  showLoader(){
    this.loadingSubject.next(true);
  }

  hideLoader(){
    this.loadingSubject.next(false);
  }

  getLoaderObservable() {
    return this.loadingSubject.asObservable();
  }
}
