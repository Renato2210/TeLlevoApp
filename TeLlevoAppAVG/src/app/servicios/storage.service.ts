import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private bdd: Storage | null = null;
  private dbUrl = 'http://localhost:3000/users'; // Cambia la URL si es necesario

  constructor(private storage: Storage, private http: HttpClient) {
    this.init();
  }

  async init() {
    this.bdd = await this.storage.create();
  }

  // Método para obtener usuarios desde db.json
  getUserFromJson(username: string): Promise<any> {
    return this.http
      .get<any[]>(this.dbUrl)
      .pipe(map((users) => users.find((user) => user.username === username)))
      .toPromise();
  }

  async get(key: string): Promise<any> {
    await this.init();
    return this.bdd?.get(key);
  }

  async set(key: string, valor: any): Promise<any> {
    await this.init();
    return this.bdd?.set(key, valor);
  }

  async remove(key: string) {
    await this.init();
    return this.bdd?.remove(key);
  }
}
