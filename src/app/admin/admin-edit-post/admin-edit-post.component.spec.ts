import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditPostComponent } from './admin-edit-post.component';

describe('AdminEditPostComponent', () => {
  let component: AdminEditPostComponent;
  let fixture: ComponentFixture<AdminEditPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
