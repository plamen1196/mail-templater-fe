import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientSelectorComponent } from './recipient-selector.component';

describe('RecipientSelectorComponent', () => {
  let component: RecipientSelectorComponent;
  let fixture: ComponentFixture<RecipientSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipientSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
