import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimauxEditComponent } from './animaux-edit.component';

describe('AnimauxEditComponent', () => {
  let component: AnimauxEditComponent;
  let fixture: ComponentFixture<AnimauxEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimauxEditComponent]
    });
    fixture = TestBed.createComponent(AnimauxEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
