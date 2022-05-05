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
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ClipboardModule } from '@angular/cdk/clipboard'; 

import { SendEmailDashboardComponent } from './send-email-dashboard.component';
import { SendEmailDashboardRoutingModule } from './send-email-dashboard-routing.module';
import { UtilModule } from 'src/util/util.module';
import { TemplateSelectorComponent } from './template-selector/template-selector.component';
import { TemplatesListComponent } from './templates-list/templates-list.component';
import { RecipientGroupsSelectorComponent } from './recipient-groups-selector/recipient-groups-selector.component';
import { RecipientSelectorComponent } from './recipient-selector/recipient-selector.component';
import { EmailSenderComponent } from './email-sender/email-sender.component';
import { RecipientGroupsListComponent } from './recipient-groups-list/recipient-groups-list.component';
import { RecipientsListComponent } from './recipients-list/recipients-list.component';

@NgModule({
  declarations: [
    SendEmailDashboardComponent,
    TemplateSelectorComponent,
    TemplatesListComponent,
    RecipientGroupsSelectorComponent,
    RecipientSelectorComponent,
    EmailSenderComponent,
    RecipientGroupsListComponent,
    RecipientsListComponent
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
    MatSnackBarModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    ClipboardModule,
    UtilModule
  ]
})
export class SendEmailDashboardModule { }
