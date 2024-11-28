import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIControllerService } from 'src/app/servicios/apicontroller.service';

@Component({
  selector: 'app-viaje-iniciado',
  templateUrl: './viaje-iniciado.page.html',
  styleUrls: ['./viaje-iniciado.page.scss'],
})
export class ViajeIniciadoPage implements OnInit {

  constructor(
    private router: Router,
    private api: APIControllerService
  ) { }

  ngOnInit() {
  }

  cancelarViaje() {
    this.router.navigate(['/home']);
  }
}
