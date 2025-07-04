// src/app/services/bodegas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdmBodegaService {
  private baseUrl = `${environment.apiUrl}/api/bodega`;

  constructor(private http: HttpClient) {}

      /**
   * Actualiza el stock de una pieza desde el perfil del bodeguero.
   * @param id_usuario - ID del usuario bodeguero autenticado
   * @param data - Objeto con los datos: id_pieza, cantidad, id_tipo_movimiento, observaciones
   */
  actualizarStock(id_usuario: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizar-stock/${id_usuario}`, data);
  }

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

  obtenerInventarioPorUsuario(id_usuario: number, search?: string, id_categoria?: number): Observable<any[]> {
    let params = new HttpParams();

    if (search) {
      params = params.set('search', search);
    }

    if (id_categoria) {
      params = params.set('id_categoria', id_categoria.toString());
    }

    return this.http.get<any[]>(`${this.baseUrl}/inventario/${id_usuario}`, { params });
  }  



}
