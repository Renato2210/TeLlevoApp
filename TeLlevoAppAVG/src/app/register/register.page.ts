import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticatorService } from 'src/app/servicios/authenticator.service';

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
  constructor(
    private navCtrl: NavController,
    private auth: AuthenticatorService,
    private router: Router,
    private toastController: ToastController
  ) {}

  register() {

    this.spinner = true;


    setTimeout(() => {
      this.spinner = false; 
    }, 200);

    this.auth
      .register(this.user)
      .then((res) => {
        this.router.navigate(['/login']);
        return this.toastController.create({
          message: 'Registrado con exito',
          duration: 5000,
          position: 'bottom',
        });
      })
      .then((toast) => toast.present())
      .catch((error) => {
        return this.toastController
          .create({
            message: 'Error al registrar',
            duration: 5000,
            position: 'bottom',
          })
          .then((toast) => toast.present());
      });

    
  }

  atras() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {}
}