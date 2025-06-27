import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarInventarioPage } from './listar-inventario.page';

describe('ListarInventarioPage', () => {
  let component: ListarInventarioPage;
  let fixture: ComponentFixture<ListarInventarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarInventarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
