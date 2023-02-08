import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditCustomersComponent } from './admin-edit-customers.component';

describe('AdminEditCustomersComponent', () => {
  let component: AdminEditCustomersComponent;
  let fixture: ComponentFixture<AdminEditCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
