import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-viaje',
  templateUrl: './buscar-viaje.page.html',
  styleUrls: ['./buscar-viaje.page.scss'],
})
export class BuscarViajePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  solicitar(tipoVehiculo: string) {
    console.log(`Solicitar ${tipoVehiculo}`);
    this.router.navigate(['/solicitud'], {
      queryParams: { tipo: tipoVehiculo }
    });
  }
  
  cancelar() {
    this.router.navigate(['/home']);
  }
}
