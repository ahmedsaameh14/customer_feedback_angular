import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../Service/feedback.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
feedbacks$; // Define it here

  constructor(private _feedbackS: FeedbackService) {
    // Assign it here, after _feedbackS exists
    this.feedbacks$ = this._feedbackS.feedbacks$;
  }

  ngOnInit() {
    this._feedbackS.loadAllFeedbacks();
  }
}
