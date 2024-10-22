import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userDataSubject = new BehaviorSubject<any>(null);
  public userData$ = this.userDataSubject.asObservable();

  constructor() {
    this.loadUserDataFromLocalStorage();
  }

  private loadUserDataFromLocalStorage() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      this.updateUserData(JSON.parse(loggedInUser));
    }
  }

  public updateUserData(data: any) {
    this.userDataSubject.next(data);
  }
}