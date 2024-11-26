import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIControllerService } from 'src/app/servicios/apicontroller.service';


@Component({
  selector: 'app-buscar-viaje',
  templateUrl: './buscar-viaje.page.html',
  styleUrls: ['./buscar-viaje.page.scss'],
})
export class BuscarViajePage implements OnInit {
  viajes: any[] = [];  

  constructor(
    private router: Router,
    private api: APIControllerService
  ) { }

  ngOnInit() {
    this.api.getViajes().subscribe(
      (data) => {
        this.viajes = data;  
      },
      (error) => {
        console.error('Error al obtener los viajes', error);
      }
    );
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
