import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLandscapeComponent } from './page-landscape.component';

describe('PageLandscapeComponent', () => {
  let component: PageLandscapeComponent;
  let fixture: ComponentFixture<PageLandscapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLandscapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLandscapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
