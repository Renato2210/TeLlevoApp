import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComenzarViajePage } from './comenzar-viaje.page';

describe('ComenzarViajePage', () => {
  let component: ComenzarViajePage;
  let fixture: ComponentFixture<ComenzarViajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComenzarViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
