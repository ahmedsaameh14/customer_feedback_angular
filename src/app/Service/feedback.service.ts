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

  URL = 'http://localhost:3000/api/feedback';

  addFeedback(text: string) {
    return this._http.post(this.URL, { text });
  }
  loadAllFeedbacks(page: number=1 , limit: number=5) {
    return this._http.get<FeedbackRes>(`${this.URL}?page=${page}&limit=${limit}`)
  }
}
