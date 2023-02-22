import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditAccountComponent } from './customer-edit-account.component';

describe('CustomerEditAccountComponent', () => {
  let component: CustomerEditAccountComponent;
  let fixture: ComponentFixture<CustomerEditAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerEditAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerEditAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
