import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user = {
    username: '',
    email: '',
    password: '',
  };
  spinner: boolean = false;
  constructor(private navCtrl: NavController,private router: Router) {}

  register() {
    this.spinner = true;


    setTimeout(() => {
      this.spinner = false; 
      this.navCtrl.navigateForward('/register');
    }, 500);
  }

  atras() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {}
}