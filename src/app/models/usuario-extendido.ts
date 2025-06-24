export interface UsuarioExtendido {
  id_usuario: number;
  nombre: string;
  correo: string;
  direccion?: string;
  nombre_comuna: string;
  nombre_tipo_usuario: string;
  id_almacen?: number;
  estado: boolean;
}
