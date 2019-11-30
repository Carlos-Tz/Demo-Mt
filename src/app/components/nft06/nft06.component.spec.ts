import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nft06Component } from './nft06.component';

describe('Nft06Component', () => {
  let component: Nft06Component;
  let fixture: ComponentFixture<Nft06Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nft06Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nft06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
