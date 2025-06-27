import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {
  private baseUrl = `${environment.apiUrl}/api/alertas`;

  constructor(private http: HttpClient) {}

  getPiezasVencidas(id_almacen: number): Observable<any[]> {
    const params = new HttpParams().set('id_almacen', id_almacen.toString());
    return this.http.get<any[]>(`${this.baseUrl}/piezas-vencidas`, { params });
  }

  getPiezasStockBajo(id_almacen: number): Observable<any[]> {
    const params = new HttpParams().set('id_almacen', id_almacen.toString());
    return this.http.get<any[]>(`${this.baseUrl}/stock-bajo`, { params });
  }
}