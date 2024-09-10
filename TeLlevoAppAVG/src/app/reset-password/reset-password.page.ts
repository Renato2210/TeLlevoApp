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
  constructor(private navCtrl: NavController,private router: Router) { }


  resetPassword() {
    // Lógica para restablecer la contraseña
    this.navCtrl.navigateBack('/login');
  }

  goBack() {
    this.router.navigate(['/login']); // Asegúrate de que '/login' sea la ruta correcta hacia la página de inicio de sesión
  }
  ngOnInit() {
  }

}
