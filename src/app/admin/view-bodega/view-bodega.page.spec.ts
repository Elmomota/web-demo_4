import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewBodegaPage } from './view-bodega.page';

describe('ViewBodegaPage', () => {
  let component: ViewBodegaPage;
  let fixture: ComponentFixture<ViewBodegaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBodegaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
