import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeedbackService } from '../Service/feedback.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {

  feedbackForm: FormGroup;
  message = '';
  isSent = false;
  
  constructor(private fb:FormBuilder , private _feedbackS:FeedbackService){
    this.feedbackForm = this.fb.group({
      text: ['' , [Validators.required]]
    })
  }

  sendFeedback(){
    if(this.feedbackForm.invalid){
      this.feedbackForm.markAllAsTouched();
      return;
    }

    this.isSent=true;
    this._feedbackS.addFeedback(this.feedbackForm.value.text).subscribe({
      next: (res:any) =>{
        this.message = res.message;
        this.feedbackForm.reset();
        this.isSent = false
      },
      error: (err) =>{
        this.message = err.error?.message || 'Something went wrong';
        this.isSent = false
      }
    })
  }

}
