import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Fc07Component } from './fc07.component';

describe('Fc07Component', () => {
  let component: Fc07Component;
  let fixture: ComponentFixture<Fc07Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Fc07Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Fc07Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
