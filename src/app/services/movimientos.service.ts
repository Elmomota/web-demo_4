// src/app/services/movimientos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  private baseUrl = `${environment.apiUrl}/api/movimientos`;

  constructor(private http: HttpClient) {}

  // ✅ Usar este para historial de un bodeguero
  obtenerPorSucursal(id_almacen: number, filtros?: any): Observable<any[]> {
    let params = new HttpParams();

    if (filtros) {
      Object.keys(filtros).forEach(key => {
        if (filtros[key] != null && filtros[key] !== '') {
          params = params.set(key, filtros[key]);
        }
      });
    }

    return this.http.get<any[]>(`${this.baseUrl}/sucursal/${id_almacen}`, { params });
  }

  // ✅ Este para administrador/contador que ve todos
  obtenerGeneral(filtros?: any): Observable<any[]> {
    let params = new HttpParams();

    if (filtros) {
      Object.keys(filtros).forEach(key => {
        if (filtros[key] != null && filtros[key] !== '') {
          params = params.set(key, filtros[key]);
        }
      });
    }

    return this.http.get<any[]>(`${this.baseUrl}/empresa`, { params });
  }
}
