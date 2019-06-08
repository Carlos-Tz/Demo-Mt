import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ft08incpeComponent } from './ft08incpe.component';

describe('Ft08incpeComponent', () => {
  let component: Ft08incpeComponent;
  let fixture: ComponentFixture<Ft08incpeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ft08incpeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ft08incpeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
