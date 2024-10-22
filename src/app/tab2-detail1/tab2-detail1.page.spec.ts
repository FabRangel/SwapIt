import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tab2Detail1Page } from './tab2-detail1.page';

describe('Tab2Detail1Page', () => {
  let component: Tab2Detail1Page;
  let fixture: ComponentFixture<Tab2Detail1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab2Detail1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
