import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { EmailTemplaterApi } from 'src/api/email-templater-api';
import { EmailTemplate } from 'src/models/templates/email-template';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private httpClient: HttpClient) { }

  getTemplates(): Observable<Array<EmailTemplate>> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.get<Array<EmailTemplate>>(EmailTemplaterApi.GET_TEMPLATES, { headers });
  }

  createTemplate(emailTemplateRequest: EmailTemplate): Observable<EmailTemplate> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.post<EmailTemplate>(EmailTemplaterApi.CREATE_TEMPLATE, emailTemplateRequest, { headers });
  }

  deleteTemplate(id: number): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.delete<any>(EmailTemplaterApi.DELETE_TEMPLATE + `${id}`, { headers });
  }

  editTemplate(id: number, emailTemplateRequest: EmailTemplate): Observable<EmailTemplate> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.patch<any>(EmailTemplaterApi.PATCH_TEMPLATE + `${id}`, emailTemplateRequest, { headers });
  }
}
