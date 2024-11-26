import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable   ({
  providedIn: 'root'
})
export class APIControllerService {

  apiURL = "https://xh72s73s-3000.brs.devtunnels.ms";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.apiURL + "/users");
  }
  postUser(data: any): Observable<any> {
    return this.http.post(this.apiURL + "/users", data);
  }
  updateUser(id: string, data: any): Observable<any> {
    return this.http.put(this.apiURL + "/users/" + id, data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(this.apiURL + "/users/" + id);
  }

  getViajes(): Observable<any> {
    return this.http.get(this.apiURL + "/viajes");
  }

  deleteTrip(id: string): Observable<any> {
    return this.http.delete(this.apiURL + "/viajes/" + id);
  }


  
}
