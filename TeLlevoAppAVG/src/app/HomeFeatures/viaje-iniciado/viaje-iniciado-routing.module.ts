import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajeIniciadoPage } from './viaje-iniciado.page';

const routes: Routes = [
  {
    path: '',
    component: ViajeIniciadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajeIniciadoPageRoutingModule {}
