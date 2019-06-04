import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtCerounoComponent } from './ft-cerouno.component';

describe('FtCerounoComponent', () => {
  let component: FtCerounoComponent;
  let fixture: ComponentFixture<FtCerounoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtCerounoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtCerounoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
