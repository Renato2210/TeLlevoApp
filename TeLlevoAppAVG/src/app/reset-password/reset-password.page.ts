import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  username: string = '';
  spinner: boolean = false;
  errorMessage: string = ''; // Variable para el mensaje de error

  constructor(private navCtrl: NavController, private router: Router) {}

  resetPassword() {
    if (this.username.trim() === '') { // Verificar si el campo de usuario está vacío
      this.errorMessage = 'Por favor ingrese su nombre de usuario';
      return; // Salir de la función si el campo está vacío
    }

    this.spinner = true;

    // Simular una operación asincrónica
    setTimeout(() => {
      this.spinner = false;
      this.navCtrl.navigateForward('/login');
    }, 1000);
  }

  goBack() {
    this.router.navigate(['/login']); // Navegar de vuelta al login
  }

  ngOnInit() {}
}
