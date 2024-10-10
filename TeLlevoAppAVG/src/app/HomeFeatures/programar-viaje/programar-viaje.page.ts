import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-programar-viaje',
  templateUrl: './programar-viaje.page.html',
  styleUrls: ['./programar-viaje.page.scss'],
})
export class ProgramarViajePage implements OnInit {
  destino: string = ''; 
  precio: number = 0; 

  constructor(private router: Router) { }

  ngOnInit() {
  }
  fijarPrecio() {
    console.log('Dirección:', this.destino);
    console.log('Precio:', this.precio);
  }

  cancelar() {
    this.router.navigate(['/home']);
  }

}
