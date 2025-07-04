export interface Usuario {
  id_usuario: number;
  p_nombre: string;
  s_nombre?: string;
  a_paterno: string;
  a_materno?: string;
  correo: string;
  direccion?: string;
  nombre_comuna: string;
  nombre_region: string;
  nombre_tipo_usuario: string;
  nombre_almacen?: string;
  id_almacen?: number | null;
  id_comuna: number;            // ✅ nuevo campo necesario para ion-select
  id_tipo_usuario: number;      // ✅ nuevo campo necesario para ion-select
  estado: boolean;
}


export interface UsuarioLoginUsuario {
  id_usuario: number;
  correo: string;
  id_tipo_usuario: number;
}
