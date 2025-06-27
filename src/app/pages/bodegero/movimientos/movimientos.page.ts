import { Component, OnInit } from '@angular/core';
import { MovimientosService } from 'src/app/services/movimientos.service';
import { ComboboxesService } from 'src/app/services/comboboxes.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertasService } from 'src/app/services/alertas.service';
import { PopoverController } from '@ionic/angular';
import { AlertasPopoverComponent } from 'src/app/components/alertas-popover/alertas-popover.component';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.page.html',
  styleUrls: ['./movimientos.page.scss'],
  standalone: false
})
export class MovimientosPage implements OnInit {
  usuario: any;
  id_almacen: number = 0;

  filtros = {
    fecha: '',
    fecha_inicio: '',
    fecha_fin: '',
    id_pieza: null,
    id_usuario: null,
    id_proyecto: null
  };

  movimientos: any[] = [];

  piezas: any[] = [];
  usuarios: any[] = [];
  proyectos: any[] = [];

  piezasVencidas: any[] = [];
  piezasStockBajo: any[] = [];

  constructor(
    private storageService: StorageService,
    private movimientosService: MovimientosService,
    private comboboxService: ComboboxesService,
    private alertaService: AlertasService,
    private popoverCtrl: PopoverController
  ) {}

  async ngOnInit() {
    this.usuario = await this.storageService.obtenerSesion();
    this.id_almacen = Number(this.usuario?.id_almacen) || 0;
    this.buscarMovimientos();
    this.alertaService.getPiezasVencidas(this.id_almacen).subscribe(res => this.piezasVencidas = res);
    this.alertaService.getPiezasStockBajo(this.id_almacen).subscribe(res => this.piezasStockBajo = res);

    this.comboboxService.getPiezas().subscribe(res => this.piezas = res);
    this.comboboxService.getAlmacenes().subscribe(res => this.usuarios = res); // placeholder, si tienes endpoint real para usuarios, cámbialo
    this.comboboxService.getEstadosProyecto().subscribe(res => this.proyectos = res); // placeholder

  }

  buscarMovimientos() {
    this.movimientosService.obtenerPorSucursal(this.id_almacen, this.filtros).subscribe({
      next: res => this.movimientos = res,
      error: err => console.error('Error al cargar movimientos', err)
    });
  }

  limpiarFiltros() {
    this.filtros = {
      fecha: '',
      fecha_inicio: '',
      fecha_fin: '',
      id_pieza: null,
      id_usuario: null,
      id_proyecto: null
    };
    this.buscarMovimientos();
  }

  async mostrarPopover(tipo: 'vencidas' | 'stock', ev: Event) {
    const popover = await this.popoverCtrl.create({
      component: AlertasPopoverComponent,
      event: ev,
      translucent: true,
      componentProps: {
        piezas: tipo === 'vencidas' ? this.piezasVencidas : this.piezasStockBajo,
        tipo
      }
    });
    await popover.present();
  }
}