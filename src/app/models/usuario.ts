export interface Usuario {
  id_usuario: number;
  p_nombre : string
  s_nombre: string | null
  a_paterno: string
  a_materno: string | null
  correo: string;
  direccion?: string;
  id_comuna: number;
  id_tipo_usuario: number; // 👈 Asegúrate de incluir esta propiedad
  id_almacen?: number;
  estado: boolean;
}


export interface UsuarioLoginUsuario {
  id_usuario: number;
  id_tipo_usuario: number; // 👈 Asegúrate de incluir esta propiedad
  id_almacen?: number;

}