import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecipientGroupComponent } from './create-recipient-group.component';

describe('CreateRecipientGroupComponent', () => {
  let component: CreateRecipientGroupComponent;
  let fixture: ComponentFixture<CreateRecipientGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRecipientGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecipientGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
