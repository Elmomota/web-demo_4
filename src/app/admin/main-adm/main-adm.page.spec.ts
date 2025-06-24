import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainAdmPage } from './main-adm.page';

describe('MainAdmPage', () => {
  let component: MainAdmPage;
  let fixture: ComponentFixture<MainAdmPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAdmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
