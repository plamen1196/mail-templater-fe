import { Component, OnInit, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EmailTemplate } from 'src/models/templates/email-template';
import { Recipient } from 'src/models/recipient';
import { EmailService } from 'src/services/email.service';

@Component({
  selector: 'app-email-sender',
  templateUrl: './email-sender.component.html',
  styleUrls: ['./email-sender.component.scss']
})
export class EmailSenderComponent implements OnInit {

  @Input()
  emailTemplate: EmailTemplate;

  html = false;

  sending = false;

  constructor(
    private dialog: MatDialog,
    private emailService: EmailService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    // recipients from service
  }

  editRecipient(recipient: Recipient): void {
  }

  send(): void {
  }

  preview(): void {
  }
}
