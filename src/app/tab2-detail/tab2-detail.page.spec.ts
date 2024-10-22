import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tab2DetailPage } from './tab2-detail.page';

describe('Tab2DetailPage', () => {
  let component: Tab2DetailPage;
  let fixture: ComponentFixture<Tab2DetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab2DetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
