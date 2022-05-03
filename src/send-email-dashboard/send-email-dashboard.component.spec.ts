import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailDashboardComponent } from './send-email-dashboard.component';

describe('SendEmailDashboardComponent', () => {
  let component: SendEmailDashboardComponent;
  let fixture: ComponentFixture<SendEmailDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendEmailDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendEmailDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
