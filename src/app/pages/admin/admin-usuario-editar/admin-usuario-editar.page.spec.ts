import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminUsuarioEditarPage } from './admin-usuario-editar.page';

describe('AdminUsuarioEditarPage', () => {
  let component: AdminUsuarioEditarPage;
  let fixture: ComponentFixture<AdminUsuarioEditarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsuarioEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
