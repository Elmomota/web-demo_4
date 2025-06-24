import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPiezaPage } from './view-pieza.page';

describe('ViewPiezaPage', () => {
  let component: ViewPiezaPage;
  let fixture: ComponentFixture<ViewPiezaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPiezaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
