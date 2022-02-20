import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRecipientGroupComponent } from './delete-recipient-group.component';

describe('DeleteRecipientGroupComponent', () => {
  let component: DeleteRecipientGroupComponent;
  let fixture: ComponentFixture<DeleteRecipientGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRecipientGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRecipientGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
