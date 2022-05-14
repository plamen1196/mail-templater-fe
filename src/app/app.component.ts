import { Component, OnInit } from '@angular/core';
import { TemplateService } from 'src/services/template.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'mail-templater-fe';

  constructor(private templatesService: TemplateService) { }

  ngOnInit(): void {
    /* Fetching the templates message max length once and preserving the result. */
    this.templatesService.getTemplatesMessageMaxLength().subscribe();
  }
}
