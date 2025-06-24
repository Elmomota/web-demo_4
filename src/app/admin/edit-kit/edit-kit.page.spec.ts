import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditKitPage } from './edit-kit.page';

describe('EditKitPage', () => {
  let component: EditKitPage;
  let fixture: ComponentFixture<EditKitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
