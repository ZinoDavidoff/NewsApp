import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPollComponent } from './news-poll.component';

describe('NewsPollComponent', () => {
  let component: NewsPollComponent;
  let fixture: ComponentFixture<NewsPollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsPollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
