import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecipientGroupsComponent } from './view-recipient-groups.component';

describe('ViewRecipientGroupsComponent', () => {
  let component: ViewRecipientGroupsComponent;
  let fixture: ComponentFixture<ViewRecipientGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRecipientGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRecipientGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
