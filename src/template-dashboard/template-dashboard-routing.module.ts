
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewTemplatesComponent } from './view-templates.component';

const routes: Routes = [
  {
    path: '',
    component: ViewTemplatesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateDashboardRoutingModule { }
