import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRecipientSelectorComponent } from './custom-recipient-selector.component';

describe('CustomRecipientSelectorComponent', () => {
  let component: CustomRecipientSelectorComponent;
  let fixture: ComponentFixture<CustomRecipientSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomRecipientSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRecipientSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
