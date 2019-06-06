import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtCeronueveComponent } from './ft-ceronueve.component';

describe('FtCeronueveComponent', () => {
  let component: FtCeronueveComponent;
  let fixture: ComponentFixture<FtCeronueveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtCeronueveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtCeronueveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
