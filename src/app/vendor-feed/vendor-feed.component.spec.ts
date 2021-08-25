import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorFeedComponent } from './vendor-feed.component';

describe('VendorFeedComponent', () => {
  let component: VendorFeedComponent;
  let fixture: ComponentFixture<VendorFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
