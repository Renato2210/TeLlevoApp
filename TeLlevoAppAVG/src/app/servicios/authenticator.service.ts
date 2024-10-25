import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatorService {
  connnectionStatus: boolean = false;
  private dbUrl = 'http://localhost:3000/users';
  
  constructor(private storage: StorageService,private http: HttpClient) {}

  loginBDD(user: string, pass: string): Promise<boolean> {
    return this.storage.getUserFromJson(user)
      .then((res) => {
        // Asegúrate de que res no sea null antes de acceder a sus propiedades
        if (res && res.password === pass) {
          this.connnectionStatus = true;
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.log('Error en el sistema: ' + error);
        return false;
      });
  }

  login(user: string, pass: string): boolean {
    if (user === 'admin' && pass === 'admin1234') {
      this.connnectionStatus = true;
      return true;
    }
    this.connnectionStatus = false;
    return false;
  }

  logout() {
    this.connnectionStatus = false;
  }

  isConected() {
    return this.connnectionStatus;
  }

  async register(user: any): Promise<boolean> {
    // Aquí se hace la petición POST para registrar al usuario
    return this.http.post(this.dbUrl, user).toPromise()
      .then((res) => {
        return true;
      })
      .catch((error) => {
        console.error('Error al registrar usuario:', error);
        return false;
      });
  }
}
