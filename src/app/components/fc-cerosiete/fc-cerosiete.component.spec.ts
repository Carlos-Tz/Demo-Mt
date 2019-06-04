import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcCerosieteComponent } from './fc-cerosiete.component';

describe('FcCerosieteComponent', () => {
  let component: FcCerosieteComponent;
  let fixture: ComponentFixture<FcCerosieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcCerosieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcCerosieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
