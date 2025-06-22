import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdmPiezasService {
  private baseUrl = `${environment.apiUrl}/gestion_piezas`;

  constructor(private http: HttpClient) {}

  // === PIEZAS ===
  listarPiezas(id_usuario: number): Observable<any[]> {
    const params = new HttpParams().set('id_usuario', id_usuario.toString());
    return this.http.get<any[]>(`${this.baseUrl}/piezas`, { params });
  }

  crearPieza(id_usuario: number, data: any): Observable<any> {
    const params = new HttpParams().set('id_usuario', id_usuario.toString());
    return this.http.post(`${this.baseUrl}/piezas`, data, { params });
  }

  editarPieza(id_usuario: number, id_pieza: number, data: any): Observable<any> {
    const params = new HttpParams().set('id_usuario', id_usuario.toString());
    return this.http.put(`${this.baseUrl}/piezas/${id_pieza}`, data, { params });
  }

  eliminarPieza(id_usuario: number, id_pieza: number): Observable<any> {
    const params = new HttpParams().set('id_usuario', id_usuario.toString());
    return this.http.delete(`${this.baseUrl}/piezas/${id_pieza}`, { params });
  }

  // === KITS ===
  listarKits(id_usuario: number): Observable<any[]> {
    const params = new HttpParams().set('id_usuario', id_usuario.toString());
    return this.http.get<any[]>(`${this.baseUrl}/kits`, { params });
  }

  crearKit(id_usuario: number, data: any): Observable<any> {
    const params = new HttpParams().set('id_usuario', id_usuario.toString());
    return this.http.post(`${this.baseUrl}/kits`, data, { params });
  }

  editarKit(id_usuario: number, id_kit: number, data: any): Observable<any> {
    const params = new HttpParams().set('id_usuario', id_usuario.toString());
    return this.http.put(`${this.baseUrl}/kits/${id_kit}`, data, { params });
  }

  eliminarKit(id_usuario: number, id_kit: number): Observable<any> {
    const params = new HttpParams().set('id_usuario', id_usuario.toString());
    return this.http.delete(`${this.baseUrl}/kits/${id_kit}`, { params });
  }

  // === KIT-PIEZA ===
  listarKitPiezas(id_usuario: number, id_kit: number): Observable<any[]> {
    const params = new HttpParams()
      .set('id_usuario', id_usuario.toString())
      .set('id_kit', id_kit.toString());
    return this.http.get<any[]>(`${this.baseUrl}/kit_piezas/${id_kit}`, { params });
  }

  agregarPiezaAKit(id_usuario: number, data: any): Observable<any> {
    const params = new HttpParams().set('id_usuario', id_usuario.toString());
    return this.http.post(`${this.baseUrl}/kit_piezas`, data, { params });
  }

  actualizarPiezaEnKit(id_usuario: number, data: any): Observable<any> {
    const params = new HttpParams().set('id_usuario', id_usuario.toString());
    return this.http.put(`${this.baseUrl}/kit_piezas`, data, { params });
  }

  eliminarPiezaDeKit(id_usuario: number, id_kit: number, id_pieza: number): Observable<any> {
    const params = new HttpParams()
      .set('id_usuario', id_usuario.toString())
      .set('id_kit', id_kit.toString())
      .set('id_pieza', id_pieza.toString());
    return this.http.delete(`${this.baseUrl}/kit_piezas`, { params });
  }
}
