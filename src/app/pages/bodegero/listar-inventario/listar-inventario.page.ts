/*src\app\pages\bodegero\listar-inventario\listar-inventario.page.ts**/
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AlertasService } from 'src/app/services/alertas.service';
import { AdmBodegaService } from 'src/app/services/adm-bodega.service';
import { ComboboxesService } from 'src/app/services/comboboxes.service';
import { PopoverController, ModalController } from '@ionic/angular';
import { AlertasPopoverComponent } from 'src/app/components/alertas-popover/alertas-popover.component';
import { ModificarStockPage } from '../modificar-stock/modificar-stock.page';

@Component({
  selector: 'app-listar-inventario',
  templateUrl: './listar-inventario.page.html',
  styleUrls: ['./listar-inventario.page.scss'],
  standalone: false
})
export class ListarInventarioPage implements OnInit {
  usuario: any;
  piezas: any[] = [];
  categorias: any[] = [];

  search: string = '';
  id_categoria: number | null = null;

  piezasVencidas: any[] = [];
  piezasStockBajo: any[] = [];

  constructor(
    private storageService: StorageService,
    private inventarioService: AdmBodegaService,
    private alertaService: AlertasService,
    private comboService: ComboboxesService,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    this.usuario = await this.storageService.obtenerSesion();

    if (!this.usuario?.id_usuario || !this.usuario?.id_almacen) return;
    this.inventarioService.obtenerInventarioPorUsuario(this.usuario.id_usuario).subscribe({next: res => this.piezas = res})
    this.comboService.getCategorias().subscribe(res => this.categorias = res);
    this.alertaService.getPiezasVencidas(this.usuario.id_almacen).subscribe(res => this.piezasVencidas = res);
    this.alertaService.getPiezasStockBajo(this.usuario.id_almacen).subscribe(res => this.piezasStockBajo = res);
    
  }

  buscar() {
    const filtros: any = {};

    if (typeof this.search === 'string' && this.search.trim() !== '') {
      filtros.search = this.search.trim();
    }

    if (this.id_categoria != null) {
      filtros.id_categoria = this.id_categoria;
    }

    this.inventarioService.obtenerInventarioPorUsuario(this.usuario.id_usuario, filtros.search, filtros.id_categoria).subscribe({
      next: res => this.piezas = res,
      error: err => console.error('Error al cargar inventario:', err)
    });
  }

  limpiar() {
    this.search = '';
    this.id_categoria = null;
    this.buscar();
  }

  async abrirPopover(tipo: 'vencidas' | 'stock', event: Event) {
    const popover = await this.popoverCtrl.create({
      component: AlertasPopoverComponent,
      event,
      translucent: true,
      componentProps: {
        piezas: tipo === 'vencidas' ? this.piezasVencidas : this.piezasStockBajo,
        tipo
      }
    });
    await popover.present();
  }

  async abrirModal(pieza: any) {
    const modal = await this.modalCtrl.create({
      component: ModificarStockPage,
      componentProps: {
        pieza,
        id_usuario: this.usuario.id_usuario
      }
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data?.recargar) this.buscar();
  }
}
