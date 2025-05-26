import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';  // Asegúrate que esta ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000';  // URL del backend FastAPI

  constructor(private http: HttpClient) {}

  /**
   * Envía las credenciales al backend para autenticar al usuario.
   * @param correo - Correo electrónico del usuario
   * @param contrasena - Contraseña del usuario
   * @returns Observable con un objeto tipo Usuario
   */
  loginUsuario(correo: string, contrasena: string): Observable<Usuario> {
    const formData = new FormData();
    formData.append('correo', correo);
    formData.append('contrasena', contrasena);

    return this.http.post<Usuario>(`${this.apiUrl}/api/login`, formData);
  }
  enviarCodigoRecuperacion(data: FormData) {
  return this.http.post(`${this.apiUrl}/api/user/send-recovery-code`, data);
}

verificarCodigoRecuperacion(data: FormData) {
  return this.http.post(`${this.apiUrl}/api/user/verify-recovery-code`, data);
}
resetearContrasena(data: FormData){
  return this.http.post(`${this.apiUrl}/api/user/reset-password`, data);	
}


}
