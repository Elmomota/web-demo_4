import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertasPopoverComponent } from 'src/app/components/alertas-popover/alertas-popover.component';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-bodeguero-home',
  templateUrl: './bodeguero-home.page.html',
  styleUrls: ['./bodeguero-home.page.scss'],
  standalone: false
})
export class BodegueroHomePage implements OnInit {
  usuario: any;
  id_almacen: number = 0;

  piezasVencidas: any[] = [];
  piezasStockBajo: any[] = [];

  constructor(
    private router: Router,
    private storageService: StorageService,
    private alertaService: AlertasService,
    private popoverCtrl: PopoverController
  ) { }

  async ngOnInit() {
    this.usuario = await this.storageService.obtenerSesion();
    this.id_almacen = this.usuario?.id_almacen || 0;

    this.cargarAlertas();
  }

  cargarAlertas() {
    if (!this.id_almacen) return;
    this.alertaService.getPiezasVencidas(this.id_almacen).subscribe(res => this.piezasVencidas = res);
    this.alertaService.getPiezasStockBajo(this.id_almacen).subscribe(res => this.piezasStockBajo = res);
  }

  irAInventario() {
    this.router.navigate(['/bodeguero-inventario'], {
      state: { id_usuario: this.usuario.id_usuario }
    });
  }

  irAMovimientos() {
    this.router.navigate(['/bodeguero-movimientos'], {
      state: { id_almacen: this.usuario.id_almacen }
    });
  }

    // método:
  async presentPopover(tipo: 'vencidas' | 'stock', ev: any) {
    const componentProps = {
      piezas: tipo === 'vencidas' ? this.piezasVencidas : this.piezasStockBajo,
      tipo
    };

    const popover = await this.popoverCtrl.create({
      component: AlertasPopoverComponent,
      event: ev,
      translucent: true,
      componentProps
    });

    await popover.present();
  }

  logout() {
    this.storageService.eliminarSesion().then(() => {
      this.router.navigate(['/login']);
    });
  }

}  


