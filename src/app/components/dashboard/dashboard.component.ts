import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  providers: [ApiService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  users: any = [];
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.api.getUsers().subscribe({
      next: (data: any) => {
        this.users = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
