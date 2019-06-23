import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFt10Component } from './edit-ft10.component';

describe('EditFt10Component', () => {
  let component: EditFt10Component;
  let fixture: ComponentFixture<EditFt10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFt10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFt10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
