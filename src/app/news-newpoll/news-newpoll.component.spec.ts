import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsNewpollComponent } from './news-newpoll.component';

describe('NewsNewpollComponent', () => {
  let component: NewsNewpollComponent;
  let fixture: ComponentFixture<NewsNewpollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsNewpollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsNewpollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
