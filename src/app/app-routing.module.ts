  
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'templates',
    loadChildren: () => import('../template-dashboard/template-dashboard.module').then(m => m.TemplateDashboardModule)
  },
  {
    path: 'recipients',
    loadChildren: () => import('../recipient-dashboard/recipient-dashboard.module').then(m => m.RecipientDashboardModule)
  },
  {
    path: 'recipient-groups',
    loadChildren: () => import('../recipient-group-dashboard/recipient-groups-dashboard.module').then(m => m.RecipientGroupsDashboardModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
