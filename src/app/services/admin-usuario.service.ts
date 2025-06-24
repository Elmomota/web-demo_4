// src/app/services/admin-usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { UsuarioExtendido } from '../models/usuario-extendido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminUsuarioService {
  private apiUrl = 'http://localhost:8000/api/admin/usuarios';

  constructor(private http: HttpClient) {}

  listarUsuarios(): Observable<UsuarioExtendido[]> {
    return this.http.get<UsuarioExtendido[]>(`${this.apiUrl}/listar`);
  }
  
  editarUsuario(usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar`, usuario);
  }
}
