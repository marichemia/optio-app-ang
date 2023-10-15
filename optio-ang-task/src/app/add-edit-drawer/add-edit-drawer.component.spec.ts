import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDrawerComponent } from './add-edit-drawer.component';

describe('AddEditDrawerComponent', () => {
  let component: AddEditDrawerComponent;
  let fixture: ComponentFixture<AddEditDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
