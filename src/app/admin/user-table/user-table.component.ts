import { Component, OnInit } from '@angular/core';

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const usersData = localStorage.getItem('users');
    if (usersData) {
      this.users = JSON.parse(usersData);
      this.filteredUsers = this.users; // Initialize filteredUsers
    }
  }

  filterUsers(): void {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.firstname.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.email.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredUsers = this.users; 
  }
}
