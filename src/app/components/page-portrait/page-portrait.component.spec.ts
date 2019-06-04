import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePortraitComponent } from './page-portrait.component';

describe('PagePortraitComponent', () => {
  let component: PagePortraitComponent;
  let fixture: ComponentFixture<PagePortraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePortraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePortraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
