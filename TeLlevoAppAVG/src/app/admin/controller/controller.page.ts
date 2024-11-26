import { Component, OnInit } from '@angular/core';
import { APIControllerService } from 'src/app/servicios/apicontroller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.page.html',
  styleUrls: ['./controller.page.scss'],
})
export class ControllerPage implements OnInit {

  users: any[] = [];
  viajes: any[] = []; 
  isFormularioVisible = false; 
  nuevoUsuario = { username: '', email: '', password: '' };
  usuarioEditado: any = {};
  isEditMode: boolean = false;

  constructor(private api: APIControllerService, private router: Router) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.cargarViajes();
  }

  // Gestión de usuarios
  mostrarFormulario() {
    this.isFormularioVisible = !this.isFormularioVisible; 
  }

  cargarUsuarios() {
    this.api.getUsers().subscribe(
      (data) => {
        this.users = data;
        console.log(this.users);
      },
      (error) => {
        console.error("Error en la llamada:", error);
      }
    );
  }

  agregarUsuario() {
    if (!this.nuevoUsuario.username || !this.nuevoUsuario.email || !this.nuevoUsuario.password) {
      console.error("Campos Vacíos");
      return;
    }

    this.api.postUser(this.nuevoUsuario).subscribe(
      (data) => {
        console.log("Usuario agregado:", data);
        this.users.push(data);
        this.nuevoUsuario = { username: '', email: '', password: '' };
        this.isFormularioVisible = false;
      },
      (error) => {
        console.error("Error al agregar el usuario:", error);
      }
    );
  }

  cancelarAgregarUsuario() {
    this.isFormularioVisible = false;
    this.nuevoUsuario = { username: '', email: '', password: '' }; 
  }

  modificarUsuario(user: any) {
    this.isEditMode = true;
    this.usuarioEditado = { ...user };
  }

  eliminarUsuario(id: any) {
    this.api.deleteUser(id).subscribe(
      () => {
        this.users = this.users.filter(user => user.id !== id);
        console.log('Usuario eliminado');
      },
      (error) => {
        console.error('Error eliminando usuario:', error);
      }
    );
  }

  guardarCambios() {
    this.api.updateUser(this.usuarioEditado.id, this.usuarioEditado).subscribe(
      (data) => {
        this.isEditMode = false;
        this.users = this.users.map(user => user.id === data.id ? data : user);
        console.log('Usuario modificado:', data);
      },
      (error) => {
        console.error('Error modificando usuario:', error);
      }
    );
  }

  cancelarEdicion() {
    this.isEditMode = false;
    this.usuarioEditado = {};
  }

  // Gestión de viajes
  cargarViajes() {
    this.api.getViajes().subscribe(
      (data) => {
        this.viajes = data;
        console.log(this.viajes);
      },
      (error) => {
        console.error('Error cargando viajes:', error);
      }
    );
  }

  eliminarViaje(id: any) {
    this.api.deleteTrip(id).subscribe(
      () => {
        this.viajes = this.viajes.filter(viajes => viajes.id !== id);
        console.log('Viaje eliminado');
      },
      (error) => {
        console.error('Error eliminando viaje:', error);
      }
    );
  }

  // Navegación
  atras() {
    this.router.navigate(['/login']);
  }
}
