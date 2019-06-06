import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtCerotresComponent } from './ft-cerotres.component';

describe('FtCerotresComponent', () => {
  let component: FtCerotresComponent;
  let fixture: ComponentFixture<FtCerotresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtCerotresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtCerotresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
