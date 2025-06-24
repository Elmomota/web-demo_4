import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddKitPage } from './add-kit.page';

describe('AddKitPage', () => {
  let component: AddKitPage;
  let fixture: ComponentFixture<AddKitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
