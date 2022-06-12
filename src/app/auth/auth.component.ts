import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  formGroup: FormGroup;

  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {},
    private dialogRef: MatDialogRef<AuthComponent>,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.generateForm();
  }

  onSave(): void {
    const username = this.formGroup.controls['username'].value;
    const password = this.formGroup.controls['password'].value;
    const authToken = this.authService.generateBasicAuth(username, password);

    this.authService.setAuthToken(authToken);
    this.dialogRef.close({ success: true, message: 'Basic authentication credentials saved successfully!' });
  }

  onCancel(): void {
    this.dialogRef.close({ success: false  });
  }

  private generateForm(): void {
    const form: FormGroup = this.formBuilder.group({});

    form.addControl('username', new FormControl('', Validators.required));
    form.addControl('password', new FormControl('', Validators.required));

    this.formGroup = form;
  }
}
