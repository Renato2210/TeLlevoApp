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
  errorMessage: string = ''; 

  constructor(private navCtrl: NavController, private router: Router) {}

  resetPassword() {
    if (this.username.trim() === '') { 
      this.errorMessage = 'Por favor ingrese su nombre de usuario';
      return; 
    }

    this.spinner = true;


    setTimeout(() => {
      this.spinner = false;
      this.navCtrl.navigateForward('/login');
    }, 1000);
  }

  goBack() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {}
}
