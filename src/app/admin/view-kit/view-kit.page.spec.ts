import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewKitPage } from './view-kit.page';

describe('ViewKitPage', () => {
  let component: ViewKitPage;
  let fixture: ComponentFixture<ViewKitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewKitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
