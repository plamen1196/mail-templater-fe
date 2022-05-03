import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendEmailDashboardComponent } from './send-email-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SendEmailDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendEmailDashboardRoutingModule { }
