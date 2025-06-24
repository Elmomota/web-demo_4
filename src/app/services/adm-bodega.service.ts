// src/app/services/bodegas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmBodegaService {
  private baseUrl = `${environment.apiUrl}/api/bodegas`;

  constructor(private http: HttpClient) {}

  listarBodegas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listar`);
  }

  crearBodega(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/crear`, data);
  }

  editarBodega(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/editar/${id}`, data);
  }

  eliminarBodega(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar/${id}`);
  }
}
