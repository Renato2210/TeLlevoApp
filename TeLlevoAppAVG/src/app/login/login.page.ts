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

  

  constructor(private navCtrl: NavController) { }

  login() {
    // Aquí solo navegamos a la página de inicio
    this.navCtrl.navigateForward('/home', {
      queryParams: { username: this.username }
    });
  }

  goToResetPassword() {
    this.navCtrl.navigateForward('/reset-password');
  }

  ngOnInit() {
  }

}
