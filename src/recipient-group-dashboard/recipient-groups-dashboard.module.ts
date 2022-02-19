import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRippleModule } from '@angular/material/core'; 
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { UtilModule } from 'src/util/util.module';
 import { ViewRecipientGroupsComponent } from './view-recipient-groups.component';
import { RecipientGroupsDashboardRoutingModule } from './recipient-groups-dashboard-routing.module';
import { RecipientGroupDetailsComponent } from './recipient-group-details/recipient-group-details.component';
import { CreateRecipientGroupComponent } from './create-recipient-group/create-recipient-group.component';

@NgModule({
  declarations: [
    ViewRecipientGroupsComponent,
    RecipientGroupDetailsComponent,
    CreateRecipientGroupComponent
  ],
  imports: [
    CommonModule,
    RecipientGroupsDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UtilModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatRippleModule,
    MatListModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class RecipientGroupsDashboardModule { }
