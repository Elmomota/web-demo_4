import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddKitDetailPage } from './add-kit-detail.page';

describe('AddKitDetailPage', () => {
  let component: AddKitDetailPage;
  let fixture: ComponentFixture<AddKitDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKitDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
