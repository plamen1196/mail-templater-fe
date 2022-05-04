import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientGroupsListComponent } from './recipient-groups-list.component';

describe('RecipientGroupsListComponent', () => {
  let component: RecipientGroupsListComponent;
  let fixture: ComponentFixture<RecipientGroupsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipientGroupsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientGroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
