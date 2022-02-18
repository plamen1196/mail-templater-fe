import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewRecipientsComponent } from "./view-recipients.component";

const routes: Routes = [
    {
      path: '',
      component: ViewRecipientsComponent
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class RecipientDashboardRoutingModule { }
