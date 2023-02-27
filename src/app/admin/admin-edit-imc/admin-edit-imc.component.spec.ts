import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditImcComponent } from './admin-edit-imc.component';

describe('AdminEditImcComponent', () => {
  let component: AdminEditImcComponent;
  let fixture: ComponentFixture<AdminEditImcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditImcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditImcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
