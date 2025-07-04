import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminUsuarioService {
  private apiUrl = 'http://localhost:8000/api/admin/usuarios';

  constructor(private http: HttpClient) {}

  listarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }
  
  editarUsuario(usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar`, usuario);
  }

  eliminarUsuario(id_usuario: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar`, {
      id_usuario,
      estado: false
    });
  }

  desactivarUsuario(id_usuario: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/desactivar`, null, {
      params: { id_usuario }
    });
  }

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear-usuario`, usuario);
  }
}
