import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPiezaPage } from './add-pieza.page';

describe('AddPiezaPage', () => {
  let component: AddPiezaPage;
  let fixture: ComponentFixture<AddPiezaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPiezaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
