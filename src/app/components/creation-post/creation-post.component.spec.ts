import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationPostComponent } from './creation-post.component';

describe('CreationPostComponent', () => {
  let component: CreationPostComponent;
  let fixture: ComponentFixture<CreationPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreationPostComponent]
    });
    fixture = TestBed.createComponent(CreationPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
