import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FeedbackRes } from '../Model/feedback';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private feedbackListSubject = new BehaviorSubject<any[]>([]);
  feedbacks$ = this.feedbackListSubject.asObservable();

  constructor(private _http: HttpClient) {}

  URL = 'https://customer-feedback-backend-ten.vercel.app/api/feedback';

  addFeedback(text: string) {
    return this._http.post(this.URL, { text });
  }
  // Add language parameter, default to empty string
loadAllFeedbacks(page: number=1 , limit: number=5, language: string = '') {
    // Add language to URL if it exists
    let url = `${this.URL}?page=${page}&limit=${limit}`;
    if (language) {
      url += `&lang=${language}`;
    }
    return this._http.get<FeedbackRes>(url);
  }
}
