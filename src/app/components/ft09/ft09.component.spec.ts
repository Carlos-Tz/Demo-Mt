import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ft09Component } from './ft09.component';

describe('Ft09Component', () => {
  let component: Ft09Component;
  let fixture: ComponentFixture<Ft09Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ft09Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ft09Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
