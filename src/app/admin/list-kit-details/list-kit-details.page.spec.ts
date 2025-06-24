import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListKitDetailsPage } from './list-kit-details.page';

describe('ListKitDetailsPage', () => {
  let component: ListKitDetailsPage;
  let fixture: ComponentFixture<ListKitDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListKitDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
