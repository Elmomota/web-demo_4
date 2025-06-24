import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdmUsuariosService {
  private baseUrl = `${environment.apiUrl}/api/admin/usuarios/`;


  constructor(private http: HttpClient) { }
  
  listarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listar`);
  }

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/crear-usuario`, usuario);
  }

  editarUsuario(usuario: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/editar`, usuario);
  }

  eliminarUsuario(id_usuario: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar/${id_usuario}`);
  }
}