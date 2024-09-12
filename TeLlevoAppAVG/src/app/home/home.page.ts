import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = 'Usuario';
  
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['username']) {
        this.username = params['username'];
      }
    });
  }

  programarViaje() {
    this.router.navigate(['/programar-viaje']);
  }

  buscarViaje() {
    this.router.navigate(['/buscar-viaje']);
  }

  comenzarViaje() {
    this.router.navigate(['/comenzar-viaje']);
  }

  cerrarSesion() {
    // Implementa la lógica para cerrar sesión, como limpiar datos del usuario
    // y redirigir a la página de login.
    this.router.navigate(['/login']);
  }
}
