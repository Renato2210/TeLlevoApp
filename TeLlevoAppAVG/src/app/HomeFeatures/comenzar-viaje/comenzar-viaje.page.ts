import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comenzar-viaje',
  templateUrl: './comenzar-viaje.page.html',
  styleUrls: ['./comenzar-viaje.page.scss'],
})
export class ComenzarViajePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  cancelarViaje() {
    this.router.navigate(['/home']);
  }
}
