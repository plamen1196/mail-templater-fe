import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { EmailTemplaterApi } from 'src/api/email-templater-api';
import { EmailTemplate } from 'src/models/email-template';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private httpClient: HttpClient) { }

  getTemplates(): Observable<Array<EmailTemplate>> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.get<Array<EmailTemplate>>(EmailTemplaterApi.FETCH_TEMPLATES, { headers });
  }

  addTemplate(emailTemplateRequest: EmailTemplate): Observable<EmailTemplate> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.post<EmailTemplate>(EmailTemplaterApi.ADD_TEMPLATE, emailTemplateRequest, { headers });
  }

  deleteTemplate(id: number): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.delete<any>(EmailTemplaterApi.DELETE_TEMPLATE + `/${id}`, { headers });
  }
}
