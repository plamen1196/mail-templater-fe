import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AbstractControlOptions, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CreateTemplateComponent } from './create-template.component';
import { UtilService } from 'src/services/util.service';
import { TemplateService } from 'src/services/template.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { EmailTemplate } from 'src/models/templates/email-template';
import { By } from '@angular/platform-browser';

class FormBuilderMock {
  group(controlsConfig: { [key: string]: any; }, options?: AbstractControlOptions | null): FormGroup {
    return new FormGroup({});
  }
}

class TemplateServiceMock {
  templatesMessageMaxLength$ = new BehaviorSubject<number>(15);

  createTemplate(emailTemplateRequest: EmailTemplate): Observable<EmailTemplate> {
    return of({ id: 1, title: 'hello', message: 'hello %(name)', placeholders: ['name']});
  }
}

fdescribe('CreateTemplateComponent', () => {
  let component: CreateTemplateComponent;
  let fixture: ComponentFixture<CreateTemplateComponent>;

  let templateService: TemplateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTemplateComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: FormBuilder, useClass: FormBuilderMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: { close: ({}): void => {} } },
        { provide: UtilService, useValue: { extractPlaceholders: (value: string) => [] } },
        { provide: TemplateService, useClass: TemplateServiceMock },
        { provide: ChangeDetectorRef, useValue: { detectChanges: (): void => {} } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    templateService = TestBed.inject(TemplateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render message-form-field', () => {
    const messageFormField = fixture.debugElement.query(By.css('.message-form-field'));
    expect(messageFormField).toBeTruthy();
  });

  it('should render correct hint based on textarea content', () => {
    const textArea = fixture.debugElement.query(By.css('textarea'));
    (textArea.nativeElement as HTMLTextAreaElement).value = 'hi there!';
    fixture.detectChanges();

    const hintElement = fixture.debugElement.query(By.css('.message-form-field mat-hint'));
    expect(hintElement).toBeTruthy();
    expect(hintElement.nativeElement.textContent).toEqual('Characters: 9 / 15 ');
  });

  it('should createTemplate', () => {
    const createTemplateSpy = spyOn(templateService, 'createTemplate').and.callThrough();

    component.onCreateTemplate();

    expect(createTemplateSpy).toHaveBeenCalledTimes(1);
  });
});
