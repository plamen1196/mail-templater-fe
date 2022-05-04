import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientGroupsSelectorComponent } from './recipient-groups-selector.component';

describe('RecipientGroupsSelectorComponent', () => {
  let component: RecipientGroupsSelectorComponent;
  let fixture: ComponentFixture<RecipientGroupsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipientGroupsSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientGroupsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
