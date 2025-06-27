import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarStockPage } from './modificar-stock.page';

describe('ModificarStockPage', () => {
  let component: ModificarStockPage;
  let fixture: ComponentFixture<ModificarStockPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarStockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
