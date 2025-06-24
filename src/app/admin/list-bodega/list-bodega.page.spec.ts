import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListBodegaPage } from './list-bodega.page';

describe('ListBodegaPage', () => {
  let component: ListBodegaPage;
  let fixture: ComponentFixture<ListBodegaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBodegaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
