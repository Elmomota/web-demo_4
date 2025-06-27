import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
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
    this.cargarDetalle();
    this.cargarEstados();
  }

cargarDetalle() {
  this.proyectosService.getDetalleProyecto(this.id).subscribe({
    next: (res: any) => {
      this.proyecto = res;
    },
    error: (err) => console.error('Error al cargar detalle del proyecto', err)
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

  editarUsuarios() {
    this.modalUsuarios = true;
    this.admUsuariosService.listarUsuarios().subscribe({
      next: (res: any[]) => {
        this.todosUsuarios = res.map((u: any) => ({
          ...u,
          asignado: this.proyecto.usuarios.some((pu: any) => pu.id_usuario === u.id_usuario)
        }));
      },
      error: (err) => console.error('Error al cargar usuarios', err)
    });
  }

  guardarUsuarios() {
    const asignados = this.todosUsuarios.filter(u => u.asignado);
    const actuales = this.proyecto.usuarios.map((u: any) => u.id_usuario);

    asignados.forEach(user => {
      if (!actuales.includes(user.id_usuario)) {
        this.proyectosService.asignarUsuario({
          id_usuario: user.id_usuario,
          id_proyecto: this.id,
          id_rol_proyecto: 1
        }).subscribe();
      }
    });

    this.proyecto.usuarios.forEach((user: any) => {
      const sigue = asignados.some(u => u.id_usuario === user.id_usuario);
      if (!sigue) {
        this.proyectosService.quitarUsuario({
          id_usuario: user.id_usuario,
          id_proyecto: this.id
        }).subscribe();
      }
    });

    setTimeout(() => {
      this.modalUsuarios = false;
      this.cargarDetalle();
    }, 1000);
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
      cantidad: this.cantidadSeleccionada,
      id_detalle: null // si tu backend lo requiere autogenerar
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
}
