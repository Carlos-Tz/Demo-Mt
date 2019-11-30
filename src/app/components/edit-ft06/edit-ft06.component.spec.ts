import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFt06Component } from './edit-ft06.component';

describe('EditFt06Component', () => {
  let component: EditFt06Component;
  let fixture: ComponentFixture<EditFt06Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFt06Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFt06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
