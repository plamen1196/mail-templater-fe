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

import { SendEmailDashboardComponent } from './send-email-dashboard.component';
import { SendEmailDashboardRoutingModule } from './send-email-dashboard-routing.module';
import { UtilModule } from 'src/util/util.module';
import { TemplateSelectorComponent } from './template-selector/template-selector.component';
import { TemplatesListComponent } from './templates-list/templates-list.component';
import { RecipientGroupsSelectorComponent } from './recipient-groups-selector/recipient-groups-selector.component';
import { RecipientSelectorComponent } from './recipient-selector/recipient-selector.component';
import { CustomRecipientSelectorComponent } from './custom-recipient-selector/custom-recipient-selector.component';

@NgModule({
  declarations: [
    SendEmailDashboardComponent,
    TemplateSelectorComponent,
    TemplatesListComponent,
    RecipientGroupsSelectorComponent,
    RecipientSelectorComponent,
    CustomRecipientSelectorComponent
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
    UtilModule
  ]
})
export class SendEmailDashboardModule { }
