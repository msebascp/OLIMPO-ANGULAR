import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarOlimpoComponent } from './navbar-olimpo.component';

describe('NavbarOlimpoComponent', () => {
  let component: NavbarOlimpoComponent;
  let fixture: ComponentFixture<NavbarOlimpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarOlimpoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarOlimpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
