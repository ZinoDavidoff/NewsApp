import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsNavbarComponent } from './news-navbar.component';

describe('NewsNavbarComponent', () => {
  let component: NewsNavbarComponent;
  let fixture: ComponentFixture<NewsNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
