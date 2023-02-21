import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTrainerComponent } from './customer-trainer.component';

describe('CustomerTrainerComponent', () => {
  let component: CustomerTrainerComponent;
  let fixture: ComponentFixture<CustomerTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerTrainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
