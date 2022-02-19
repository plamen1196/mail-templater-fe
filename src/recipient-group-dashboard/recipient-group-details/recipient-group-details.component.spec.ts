import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientGroupDetailsComponent } from './recipient-group-details.component';

describe('RecipientGroupDetailsComponent', () => {
  let component: RecipientGroupDetailsComponent;
  let fixture: ComponentFixture<RecipientGroupDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipientGroupDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientGroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
