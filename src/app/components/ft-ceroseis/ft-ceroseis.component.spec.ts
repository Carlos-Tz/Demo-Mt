import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtCeroseisComponent } from './ft-ceroseis.component';

describe('FtCeroseisComponent', () => {
  let component: FtCeroseisComponent;
  let fixture: ComponentFixture<FtCeroseisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtCeroseisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtCeroseisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
