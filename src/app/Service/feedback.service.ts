import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private _http: HttpClient) { }

   URL = 'http://localhost:3000/api/feedback'

   addFeedback(text : string){
    return this._http.post(this.URL , {text});
   }
   getFeedback(){
    return this._http.get(this.URL)
   }
}
