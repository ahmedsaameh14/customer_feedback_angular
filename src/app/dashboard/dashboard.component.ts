import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../Service/feedback.service';
import { CommonModule } from '@angular/common';
import { FeedbackRes } from '../Model/feedback';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  feedbacks: any[] = [];
  currentPage = 1;
  totalPages = 1;
  pageSize = 5;

  // 1. Add search variable
  searchLanguage: string = '';

  constructor(private _feedbackS: FeedbackService) {}

  ngOnInit() {
    this.getFeedbacks(); // Load all on init
  }

  getFeedbacks(page: number = 1) {
    // 2. Pass search term to service
    this._feedbackS
      .loadAllFeedbacks(page, this.pageSize, this.searchLanguage)
      .subscribe({
        next: (res: FeedbackRes) => {
          this.feedbacks = res.result;
          this.currentPage = res.page;
          this.totalPages = res.totalPages;
        },
      });
  }

  trackById(index: number, item: any) {
    return item._id; // استخدم الـ ID الحقيقي من قاعدة البيانات
  }

  // 3. Add search method
  onSearch() {
    this.currentPage = 1; // Reset to page 1 on new search
    this.getFeedbacks(1);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.getFeedbacks(page);
  }
}
