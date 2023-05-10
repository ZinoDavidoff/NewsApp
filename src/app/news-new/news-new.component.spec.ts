import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsNewComponent } from './news-new.component';

describe('NewsNewComponent', () => {
  let component: NewsNewComponent;
  let fixture: ComponentFixture<NewsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
