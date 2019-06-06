import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtCeroochoincie2Component } from './ft-ceroochoincie2.component';

describe('FtCeroochoincie2Component', () => {
  let component: FtCeroochoincie2Component;
  let fixture: ComponentFixture<FtCeroochoincie2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtCeroochoincie2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtCeroochoincie2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
