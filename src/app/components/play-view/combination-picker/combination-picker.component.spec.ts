import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinationPickerComponent } from './combination-picker.component';

describe('CombinationPickerComponent', () => {
  let component: CombinationPickerComponent;
  let fixture: ComponentFixture<CombinationPickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CombinationPickerComponent]
    });
    fixture = TestBed.createComponent(CombinationPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
