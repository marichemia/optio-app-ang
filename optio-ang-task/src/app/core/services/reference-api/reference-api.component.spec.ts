import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceApiComponent } from './reference-api.component';

describe('ReferenceApiComponent', () => {
  let component: ReferenceApiComponent;
  let fixture: ComponentFixture<ReferenceApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenceApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
