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

import { SendEmailDashboardComponent } from './send-email-dashboard.component';
import { SendEmailDashboardRoutingModule } from './send-email-dashboard-routing.module';
import { UtilModule } from 'src/util/util.module';

@NgModule({
  declarations: [
    SendEmailDashboardComponent
  ],
  imports: [
    CommonModule,
    SendEmailDashboardRoutingModule,
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
    MatSnackBarModule
  ]
})
export class SendEmailDashboardModule { }
