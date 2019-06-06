import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtCerocincoComponent } from './ft-cerocinco.component';

describe('FtCerocincoComponent', () => {
  let component: FtCerocincoComponent;
  let fixture: ComponentFixture<FtCerocincoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtCerocincoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtCerocincoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
