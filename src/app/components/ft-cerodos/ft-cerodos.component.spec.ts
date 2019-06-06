import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtCerodosComponent } from './ft-cerodos.component';

describe('FtCerodosComponent', () => {
  let component: FtCerodosComponent;
  let fixture: ComponentFixture<FtCerodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtCerodosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtCerodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
