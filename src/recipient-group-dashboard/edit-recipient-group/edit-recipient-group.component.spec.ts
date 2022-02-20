import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecipientGroupComponent } from './edit-recipient-group.component';

describe('EditRecipientGroupComponent', () => {
  let component: EditRecipientGroupComponent;
  let fixture: ComponentFixture<EditRecipientGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRecipientGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecipientGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
