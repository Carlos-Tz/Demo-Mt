import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ft07Component } from './ft07.component';

describe('Ft07Component', () => {
  let component: Ft07Component;
  let fixture: ComponentFixture<Ft07Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ft07Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ft07Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
