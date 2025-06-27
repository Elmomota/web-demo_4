import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodegueroHomePage } from './bodeguero-home.page';

describe('BodegueroHomePage', () => {
  let component: BodegueroHomePage;
  let fixture: ComponentFixture<BodegueroHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BodegueroHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
