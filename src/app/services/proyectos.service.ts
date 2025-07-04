import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProyectosService {
  private apiUrl = `${environment.apiUrl}/api/proyectos`;

  constructor(private http: HttpClient) {}

  // Obtener todos los proyectos
  getProyectos() {
    return this.http.get(`${this.apiUrl}/listar`);
  }

  // Obtener usuarios y piezas asignadas al proyecto
getDetalleProyecto(id: number) {
  return this.http.get(`${this.apiUrl}/detalle/${id}`);
}


  // Crear nuevo proyecto
  crearProyecto(data: any) {
    return this.http.post(`${this.apiUrl}/crear`, data);
  }

  // Cambiar estado del proyecto
  cambiarEstado(payload: { id_proyecto: number; id_estado: number }) {
    return this.http.put(`${this.apiUrl}/estado`, payload);
  }

  // Obtener usuarios asignados a un proyecto
  getUsuariosAsignados(idProyecto: number) {
    return this.http.get(`${this.apiUrl}/${idProyecto}/usuarios`);
  }

  // Obtener piezas asignadas a un proyecto
  getPiezasAsignadas(idProyecto: number) {
    return this.http.get(`${this.apiUrl}/piezas/${idProyecto}`);
  }

  // Asignar usuario a proyecto
  asignarUsuario(data: { id_usuario: number; id_proyecto: number; id_rol_proyecto: number }) {
    return this.http.post(`${this.apiUrl}/usuario/asignar`, data);
  }

  // Quitar usuario del proyecto
  quitarUsuario(data: { id_usuario: number; id_proyecto: number }) {
    return this.http.request('delete', `${this.apiUrl}/usuario/remover`, { body: data });
  }

  // Asignar producto (pieza, kit o kit_pieza)
  agregarProductoProyecto(data: { id_proyecto: number; tipo: string; producto_id: number; cantidad: number }) {
    return this.http.post(`${this.apiUrl}/pieza/asignar`, data);
  }

  // Quitar producto del proyecto
  quitarProductoProyecto(data: { id_detalle: number; id_proyecto: number }) {
    return this.http.request('delete', `${this.apiUrl}/pieza/remover`, { body: data });
  }


  
}
