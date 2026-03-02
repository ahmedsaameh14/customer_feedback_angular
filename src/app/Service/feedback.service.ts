import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  loadAllFeedbacks() {
    this._http.get<{ data: any[] }>(this.URL).subscribe((res) => {
      this.feedbackListSubject.next(res.data);
    });
  }
}
