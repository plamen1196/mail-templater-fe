import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { EmailTemplaterApi } from 'src/api/email-templater-api';
import { RecipientGroupResource } from 'src/models/recipient-groups/recipient-group-resource';

@Injectable({
  providedIn: 'root'
})
export class RecipientGroupService {

  constructor(private httpClient: HttpClient) { }

  getRecipientGroups(): Observable<Array<RecipientGroupResource>> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.get<Array<RecipientGroupResource>>(EmailTemplaterApi.GET_RECIPIENT_GROUPS, { headers });
  }

  createRecipientGroup(recipientGroupResource: RecipientGroupResource): Observable<RecipientGroupResource> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.post<RecipientGroupResource>(EmailTemplaterApi.CREATE_RECIPIENT_GROUP, recipientGroupResource, { headers });
  }

  deleteRecipientGroup(id: number): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.delete<any>(EmailTemplaterApi.DELETE_RECIPIENT_GROUP + `${id}`, { headers });
  }

  editRecipient(id: number, recipientGroupResource: RecipientGroupResource): Observable<RecipientGroupResource> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.patch<any>(EmailTemplaterApi.PATCH_RECIPIENT_GROUP + `${id}`, recipientGroupResource, { headers });
  }
}
