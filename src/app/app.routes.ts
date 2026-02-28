import { Routes } from '@angular/router';
import { FeedbackComponent } from './feedback/feedback.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {path: '' , component: FeedbackComponent},
    {path: 'dashboard' , component: DashboardComponent}
];
