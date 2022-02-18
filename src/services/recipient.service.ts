import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailTemplaterApi } from 'src/api/email-templater-api';
import { RecipientResource } from 'src/models/recipients/recipient-resource';

@Injectable({
  providedIn: 'root'
})
export class RecipientService {

  constructor(private httpClient: HttpClient) { }

  getRecipients(): Observable<Array<RecipientResource>> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.get<Array<RecipientResource>>(EmailTemplaterApi.GET_RECIPIENTS, { headers });
  }

  createRecipient(recipientResource: RecipientResource): Observable<RecipientResource> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.post<RecipientResource>(EmailTemplaterApi.CREATE_RECIPIENT, recipientResource, { headers });
  }

  deleteRecipient(id: number): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.delete<any>(EmailTemplaterApi.DELETE_RECIPIENT + `${id}`, { headers });
  }

  editRecipient(id: number, recipientResource: RecipientResource): Observable<RecipientResource> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.patch<any>(EmailTemplaterApi.PATCH_RECIPIENT + `${id}`, recipientResource, { headers });
  }
}
