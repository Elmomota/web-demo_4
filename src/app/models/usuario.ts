export interface Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
  direccion?: string;
  id_comuna: number;
  id_tipo_usuario: number; // 👈 Asegúrate de incluir esta propiedad
  id_almacen?: number;
  estado: boolean;
}
