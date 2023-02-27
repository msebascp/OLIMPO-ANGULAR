import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllPaymentsComponent } from './admin-all-payments.component';

describe('AdminAllPaymentsComponent', () => {
  let component: AdminAllPaymentsComponent;
  let fixture: ComponentFixture<AdminAllPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllPaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
