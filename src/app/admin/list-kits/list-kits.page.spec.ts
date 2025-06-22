import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListKitsPage } from './list-kits.page';

describe('ListKitsPage', () => {
  let component: ListKitsPage;
  let fixture: ComponentFixture<ListKitsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListKitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
