import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AceptPage } from './acept.page';

describe('AceptPage', () => {
  let component: AceptPage;
  let fixture: ComponentFixture<AceptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AceptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
