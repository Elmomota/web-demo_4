import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBodegaPage } from './edit-bodega.page';

describe('EditBodegaPage', () => {
  let component: EditBodegaPage;
  let fixture: ComponentFixture<EditBodegaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBodegaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
