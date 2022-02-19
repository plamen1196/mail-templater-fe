import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewRecipientGroupsComponent } from './view-recipient-groups.component';

const routes: Routes = [
  {
    path: '',
    component: ViewRecipientGroupsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipientGroupsDashboardRoutingModule { }
