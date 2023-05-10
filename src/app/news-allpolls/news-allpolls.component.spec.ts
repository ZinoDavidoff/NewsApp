import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsAllpollsComponent } from './news-allpolls.component';

describe('NewsAllpollsComponent', () => {
  let component: NewsAllpollsComponent;
  let fixture: ComponentFixture<NewsAllpollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsAllpollsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsAllpollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
