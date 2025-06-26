import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminUsuarioCrearPage } from './admin-usuario-crear.page';

describe('AdminUsuarioCrearPage', () => {
  let component: AdminUsuarioCrearPage;
  let fixture: ComponentFixture<AdminUsuarioCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsuarioCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
