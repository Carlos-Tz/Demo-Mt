import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtCeroochoincie1Component } from './ft-ceroochoincie1.component';

describe('FtCeroochoincie1Component', () => {
  let component: FtCeroochoincie1Component;
  let fixture: ComponentFixture<FtCeroochoincie1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtCeroochoincie1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtCeroochoincie1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
