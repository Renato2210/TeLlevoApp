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

  // Función que se llama al hacer clic en los botones de solicitar vehículo
  solicitar(tipoVehiculo: string) {
    console.log(`Solicitar ${tipoVehiculo}`);
    // Aquí puedes agregar la lógica para manejar la solicitud del vehículo,
    // como navegar a otra página, mostrar un mensaje, etc.
    // Por ejemplo, puedes redirigir a una página de solicitud específica:
    this.router.navigate(['/solicitud'], {
      queryParams: { tipo: tipoVehiculo }
    });
  }
  
  cancelar() {
    this.router.navigate(['/home']);
  }
}
