import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './servicios/auth.guard'; 
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'programar-viaje',
    loadChildren: () => import('./HomeFeatures/programar-viaje/programar-viaje.module').then(m => m.ProgramarViajePageModule),
    canActivate: [authGuard] 
  },
  {
    path: 'buscar-viaje',
    loadChildren: () => import('./HomeFeatures/buscar-viaje/buscar-viaje.module').then(m => m.BuscarViajePageModule),
    canActivate: [authGuard] 
  },
  {
    path: 'comenzar-viaje',
    loadChildren: () => import('./HomeFeatures/comenzar-viaje/comenzar-viaje.module').then(m => m.ComenzarViajePageModule),
    canActivate: [authGuard] 
  },

  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then( m => m.ErrorPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'controller',
    loadChildren: () => import('./admin/controller/controller.module').then( m => m.ControllerPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
