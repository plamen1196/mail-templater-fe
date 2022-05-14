import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmailRecipientComponent } from './edit-email-recipient.component';

describe('EditEmailRecipientComponent', () => {
  let component: EditEmailRecipientComponent;
  let fixture: ComponentFixture<EditEmailRecipientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEmailRecipientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmailRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
