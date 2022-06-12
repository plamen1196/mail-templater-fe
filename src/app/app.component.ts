import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TemplateService } from 'src/services/template.service';
import { AuthComponent } from './auth/auth.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'mail-templater-fe';

  constructor(
    private translateService: TranslateService,
    private templatesService: TemplateService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    /* Initialise default and all languages for translation. */
    this.initTranslations();

    /* Fetching the templates message max length once and preserving the result. */
    this.templatesService.getTemplatesMessageMaxLength().subscribe();
  }

  authenticate(): void {
    const dialogRef = this.dialog.open(AuthComponent, {
      data: {},
      width: '400px',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((authResult: { success: boolean, message: string }) => {
      if (authResult?.success) {
        this.snackbar.open(authResult.message, undefined, {
          duration: 3000
        });
      }
    });
  }

  private initTranslations(): void {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translateService.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translateService.use('en');

    // add langs
    this.translateService.addLangs(['bg']);
  }
}
