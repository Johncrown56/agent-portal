import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerTopicsComponent } from './banner-topics.component';

describe('BannerTopicsComponent', () => {
  let component: BannerTopicsComponent;
  let fixture: ComponentFixture<BannerTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerTopicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
