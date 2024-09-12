import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  mensaje: string = '';
  spinner: boolean = false;

  constructor(private navCtrl: NavController) { }

  login() {
    if (!this.username || !this.password) {
      this.mensaje = 'Usuario y/o Contraseña vacíos';
      return;
    }


    this.spinner = true;
    this.mensaje = '';


    setTimeout(() => {
      this.spinner = false;
      this.navCtrl.navigateForward('/home', {
        queryParams: { username: this.username }
      });
    }, 1500); 
  }

  goToResetPassword() {
    this.spinner = true;


    setTimeout(() => {
      this.spinner = false; 
      this.navCtrl.navigateForward('/reset-password');
    }, 1000);
  }

  ngOnInit() {
  }
}
