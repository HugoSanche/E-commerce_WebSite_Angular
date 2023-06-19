import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarStatusComponent } from './car-status.component';

describe('CarStatusComponent', () => {
  let component: CarStatusComponent;
  let fixture: ComponentFixture<CarStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarStatusComponent]
    });
    fixture = TestBed.createComponent(CarStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
