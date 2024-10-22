import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticatorService } from 'src/app/servicios/authenticator.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = 'Usuario';
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private auth: AuthenticatorService
  ) {}

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

    this.auth.logout()
    this.router.navigate(['/login']);
  }
}
