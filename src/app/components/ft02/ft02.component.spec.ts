import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ft02Component } from './ft02.component';

describe('Ft02Component', () => {
  let component: Ft02Component;
  let fixture: ComponentFixture<Ft02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ft02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ft02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
