import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajeIniciadoPage } from './viaje-iniciado.page';

describe('ViajeIniciadoPage', () => {
  let component: ViajeIniciadoPage;
  let fixture: ComponentFixture<ViajeIniciadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajeIniciadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
