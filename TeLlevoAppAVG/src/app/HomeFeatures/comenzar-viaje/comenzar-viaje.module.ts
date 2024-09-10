import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComenzarViajePageRoutingModule } from './comenzar-viaje-routing.module';

import { ComenzarViajePage } from './comenzar-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComenzarViajePageRoutingModule
  ],
  declarations: [ComenzarViajePage]
})
export class ComenzarViajePageModule {}
