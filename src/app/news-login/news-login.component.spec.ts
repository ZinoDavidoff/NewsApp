import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLoginComponent } from './news-login.component';

describe('NewsLoginComponent', () => {
  let component: NewsLoginComponent;
  let fixture: ComponentFixture<NewsLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
