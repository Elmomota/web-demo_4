import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPiezasPage } from './list-piezas.page';

describe('ListPiezasPage', () => {
  let component: ListPiezasPage;
  let fixture: ComponentFixture<ListPiezasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPiezasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
