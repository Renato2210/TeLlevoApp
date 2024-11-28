import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajeIniciadoPageRoutingModule } from './viaje-iniciado-routing.module';

import { ViajeIniciadoPage } from './viaje-iniciado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajeIniciadoPageRoutingModule
  ],
  declarations: [ViajeIniciadoPage]
})
export class ViajeIniciadoPageModule {}
