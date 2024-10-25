import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticatorService } from './../servicios/authenticator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {
    username: '',
    password: '',
  };
  
  mensaje: string = '';
  spinner: boolean = false;
  

  constructor(
    private navCtrl: NavController,
    private auth: AuthenticatorService
  ) { }

  login() {
    if (!this.user.username || !this.user.password) {
      this.mensaje = 'Usuario y/o Contraseña vacíos';
      return;
    }

    this.cambiarSpinner(); 

    this.auth
      .loginBDD(this.user.username, this.user.password) 
      .then((res) => {
        this.mensaje = 'Conexión exitosa';

        setTimeout(() => {
          this.navCtrl.navigateForward('/home', {
            queryParams: { username: this.user.username }
          });
          this.cambiarSpinner(); 
          this.mensaje = ''; 
        }, 1500);
      })
      .catch((error) => {
        setTimeout(() => {
          this.mensaje = 'Error en las credenciales';
          this.cambiarSpinner(); 
        }, 1000); 
      });
  }

  cambiarSpinner() {
    this.spinner = !this.spinner;
  }

  goToResetPassword() {
    this.spinner = true;

    setTimeout(() => {
      this.spinner = false; 
      this.navCtrl.navigateForward('/reset-password');
    }, 1000);
  }

  registrar() {
    this.spinner = true;

    setTimeout(() => {
      console.log('button registro');
      this.spinner = false; 
      this.navCtrl.navigateForward('/register');
    }, 500);
  }

  ngOnInit() {
  }
}
