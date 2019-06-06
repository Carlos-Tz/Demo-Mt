import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtCeroochoincpeComponent } from './ft-ceroochoincpe.component';

describe('FtCeroochoincpeComponent', () => {
  let component: FtCeroochoincpeComponent;
  let fixture: ComponentFixture<FtCeroochoincpeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtCeroochoincpeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtCeroochoincpeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
