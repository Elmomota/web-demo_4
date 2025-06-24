import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBodegaPage } from './add-bodega.page';

describe('AddBodegaPage', () => {
  let component: AddBodegaPage;
  let fixture: ComponentFixture<AddBodegaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBodegaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
