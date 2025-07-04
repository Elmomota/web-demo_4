import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable,forkJoin } from 'rxjs';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { ComboboxesService } from 'src/app/services/comboboxes.service';
import { AdminUsuarioService } from 'src/app/services/admin-usuario.service';

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.page.html',
  styleUrls: ['./detalle-proyecto.page.scss'],
  standalone: false,
})
export class DetalleProyectoPage implements OnInit {
  id!: number;
  proyecto: any = { usuarios: [], piezas: [], id_estado: null };

  modalUsuarios = false;
  modalProductos = false;

  todosUsuarios: any[] = [];
  estados: any[] = [];

rolesProyecto: any[] = [];

usuarioLogeado: any = null;

  productoTipo = '';
  productosDisponibles: any[] = [];
  productoSeleccionado: any = null;
  cantidadSeleccionada = 1;
  

  constructor(
    private route: ActivatedRoute,
    private proyectosService: ProyectosService,
    private comboService: ComboboxesService,
    private admUsuariosService: AdminUsuarioService
  ) {}

ngOnInit() {
  this.id = Number(this.route.snapshot.paramMap.get('id'));
  this.usuarioLogeado = JSON.parse(localStorage.getItem('usuario') || '{}');
  this.cargarDetalle();
  this.cargarEstados();
}


cargarDetalle() {
  const detalle$ = this.proyectosService.getDetalleProyecto(this.id);
  const usuarios$ = this.proyectosService.getUsuariosAsignados(this.id);
  const piezas$ = this.proyectosService.getPiezasAsignadas(this.id);

  forkJoin([detalle$, usuarios$, piezas$]).subscribe(([detalleRes, usuariosRes, piezasRes]) => {
    const usuarios = usuariosRes as any[]; // forzamos el tipo para evitar error con .find
    const responsable = usuarios.find(u => u.id_rol_proyecto === 1);

    this.proyecto = {
      ...detalleRes,
      usuarios: usuarios,
      piezas: piezasRes || [],
      responsable: responsable || null
    };
  }, (err) => {
    console.error('Error al cargar detalle completo del proyecto', err);
  });
}




  cargarEstados() {
    this.comboService.getEstadosProyecto().subscribe({
      next: (res: any[]) => this.estados = res,
      error: (err: any) => console.error('Error al cargar estados', err)
    });
  }

  actualizarEstado() {
    this.proyectosService.cambiarEstado({
      id_proyecto: this.id,
      id_estado: this.proyecto.id_estado
    }).subscribe({
      next: () => console.log('Estado actualizado correctamente'),
      error: (err) => console.error('Error al actualizar estado', err)
    });
  }

editarUsuarios(): void {
  // Evitar foco activo en elementos del fondo (mejora accesibilidad)
  (document.activeElement as HTMLElement)?.blur();

  this.modalUsuarios = true;

  const usuarios$ = this.admUsuariosService.listarUsuarios();
  const roles$ = this.comboService.getRolesProyecto();

  forkJoin<[any[], any[]]>([usuarios$, roles$]).subscribe({
    next: ([usuarios, roles]) => {
      this.rolesProyecto = roles;

      this.todosUsuarios = usuarios.map((u: any) => {
        const usuarioExistente = this.proyecto.usuarios.find((pu: any) => pu.id_usuario === u.id_usuario);
        return {
          ...u,
          asignado: !!usuarioExistente,
          id_rol_proyecto: usuarioExistente?.id_rol_proyecto || 1
        };
      });
    },
    error: (err) => console.error('Error al cargar usuarios o roles', err)
  });
}





guardarUsuarios() {
  const asignados = this.todosUsuarios.filter(u => u.asignado);
  const actuales = this.proyecto.usuarios.map((u: any) => u.id_usuario);

  const observables: Observable<any>[] = [];

  asignados.forEach(user => {
    if (!actuales.includes(user.id_usuario)) {
      observables.push(this.proyectosService.asignarUsuario({
        id_usuario: user.id_usuario,
        id_proyecto: this.id,
        id_rol_proyecto: user.id_rol_proyecto || 1
      }));
    }
  });

  this.proyecto.usuarios.forEach((user: any) => {
    const sigue = asignados.some(u => u.id_usuario === user.id_usuario);
    if (!sigue) {
      observables.push(this.proyectosService.quitarUsuario({
        id_usuario: user.id_usuario,
        id_proyecto: this.id
      }));
    }
  });

  forkJoin(observables).subscribe({
    next: () => {
      this.modalUsuarios = false;
      this.cargarDetalle();
    },
    error: (err) => console.error('Error al guardar usuarios:', err)
  });
}



  editarProductos() {
    this.modalProductos = true;
    this.productoTipo = '';
    this.productosDisponibles = [];
    this.productoSeleccionado = null;
    this.cantidadSeleccionada = 1;
  }

  cargarOpcionesProducto() {
    this.productosDisponibles = [];
    this.productoSeleccionado = null;

    if (this.productoTipo === 'pieza') {
      this.comboService.getPiezas().subscribe({
        next: (res) => this.productosDisponibles = res,
        error: (err) => console.error('Error al cargar piezas', err)
      });
    } else if (this.productoTipo === 'kit' || this.productoTipo === 'kit_pieza') {
      this.comboService.getKits().subscribe({
        next: (res) => this.productosDisponibles = res,
        error: (err) => console.error('Error al cargar kits', err)
      });
    }
  }

agregarProducto() {
  const payload: any = {
    id_proyecto: this.id,
    id_pieza: this.productoTipo === 'pieza' ? this.productoSeleccionado.id : null,
    id_kit: this.productoTipo !== 'pieza' ? this.productoSeleccionado.id : null,
    cantidad: this.cantidadSeleccionada
  };

  console.log('Payload enviado:', payload);

  this.proyectosService.agregarProductoProyecto(payload).subscribe({
    next: () => {
      this.modalProductos = false;
      this.cargarDetalle();
    },
    error: (err) => {
      console.error('Error al agregar producto', err);
    }
  });
}
devolverProducto(producto: any) {
  const payload = {
    id_detalle: producto.id_detalle,
    id_proyecto: this.proyecto.id_proyecto,
    id_usuario: this.usuarioLogeado.id_usuario, // debes tenerlo cargado
    id_almacen: this.usuarioLogeado.id_almacen   // lo mismo
  };

  this.proyectosService.quitarProductoProyecto(payload).subscribe({
    next: () => {
      console.log('Producto devuelto correctamente');
      this.cargarDetalle();
    },
    error: (err) => {
      console.error('Error al devolver producto:', err);
    }
  });
}

}
