import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComenzarViajePage } from './comenzar-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: ComenzarViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComenzarViajePageRoutingModule {}
