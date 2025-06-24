import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdittKitDetailsPage } from './editt-kit-details.page';

describe('EdittKitDetailsPage', () => {
  let component: EdittKitDetailsPage;
  let fixture: ComponentFixture<EdittKitDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittKitDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
