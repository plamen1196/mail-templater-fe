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

import { TemplateDashboardRoutingModule } from './template-dashboard-routing.module';
import { ViewTemplatesComponent } from './view-templates.component';
import { CreateTemplateComponent } from './create-template/create-template.component';

@NgModule({
  declarations: [
    ViewTemplatesComponent,
    CreateTemplateComponent
  ],
  imports: [
    CommonModule,
    TemplateDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
export class TemplateDashboardModule { }
