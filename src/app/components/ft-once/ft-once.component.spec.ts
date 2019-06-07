import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtOnceComponent } from './ft-once.component';

describe('FtOnceComponent', () => {
  let component: FtOnceComponent;
  let fixture: ComponentFixture<FtOnceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtOnceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtOnceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
