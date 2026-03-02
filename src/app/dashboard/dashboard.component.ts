import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../Service/feedback.service';
import { CommonModule } from '@angular/common';
import { FeedbackRes } from '../Model/feedback';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule , RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
feedbacks: any[] = []; // Initialize as empty array
  currentPage = 1;
  totalPages = 1;
  pageSize = 5; // Matches default in service

  constructor(private _feedbackS: FeedbackService) {}

  ngOnInit() {
    this.getFeedbacks(); // Load page 1 on init
  }

  getFeedbacks(page: number = 1) {
    this._feedbackS.loadAllFeedbacks(page, this.pageSize).subscribe({
      next: (res: FeedbackRes) => {
        // Update component state with data from backend
        this.feedbacks = res.result; 
        this.currentPage = res.page;
        this.totalPages = res.totalPages;
      },
      error: (err) => {
        console.error('Error fetching feedback:', err);
      }
    });
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.getFeedbacks(page);
  }
}
