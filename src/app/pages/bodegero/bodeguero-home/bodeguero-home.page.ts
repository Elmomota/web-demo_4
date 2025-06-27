/*src\app\pages\bodegero\bodeguero-home\bodeguero-home.page.ts**/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertController } from '@ionic/angular';
import { PopoverController} from '@ionic/angular';
import { AlertasPopoverComponent } from 'src/app/components/alertas-popover/alertas-popover.component';


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
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController
  ) {}

async ngOnInit() {
  this.usuario = await this.storageService.obtenerSesion();

  if (!this.usuario || !this.usuario.id_almacen) {
    console.warn('⚠️ Usuario no encontrado o sin almacén asignado');
    return;
  }

  this.id_almacen = Number(this.usuario.id_almacen);
  console.log('👤 Usuario:', this.usuario);
  console.log('🏬 ID almacén:', this.id_almacen);

  // 🚨 Cargar piezas vencidas
  this.alertaService.getPiezasVencidas(this.id_almacen).subscribe({
    next: (res) => {
      console.log('📦 Piezas vencidas recibidas:', res);
      this.piezasVencidas = res;
    },
    error: (err) => {
      console.error('❌ Error al obtener piezas vencidas:', err);
    }
  });

  // ⚠️ Cargar piezas con stock bajo
  this.alertaService.getPiezasStockBajo(this.id_almacen).subscribe({
    next: (res) => {
      console.log('📉 Piezas con stock bajo recibidas:', res);
      this.piezasStockBajo = res;
    },
    error: (err) => {
      console.error('❌ Error al obtener piezas con stock bajo:', err);
    }
  });
}


  irAInventario() {
    this.router.navigate(['/listar-inventario'], {
      state: { id_usuario: this.usuario.id_usuario }
    });
  }

  irAMovimientos() {
    this.router.navigate(['/movimientos'], {
      state: { id_almacen: this.usuario.id_almacen }
    });
  }

  async mostrarPiezasVencidas() {
    const msg = this.piezasVencidas.map(p => 
      `• ${p.nombre} (Venció: ${new Date(p.fecha_vencimiento).toLocaleDateString()})`
    ).join('<br>');

    const alert = await this.alertCtrl.create({
      header: 'Piezas vencidas',
      message: msg || 'No hay piezas vencidas',
      buttons: ['OK']
    });

    await alert.present();
  }

  async mostrarStockBajo() {
      const msg = this.piezasStockBajo.map(p => 
        `• ${p.nombre}: ${p.cantidad} / mín: ${p.stock_minimo}`
      ).join('\n');
    const alert = await this.alertCtrl.create({
      header: 'Stock bajo',
      message: msg || 'No hay alertas de stock',
      buttons: ['OK']
    });

    await alert.present();
  }

  logout() {
    this.storageService.eliminarSesion().then(() => {
      this.router.navigate(['/login']);
    });
  }

  async abrirPopover(tipo: 'vencidas' | 'stock', event: Event) {
  const popover = await this.popoverCtrl.create({
    component: AlertasPopoverComponent,
    event,
    translucent: true,
    componentProps: {
      piezas: tipo === 'vencidas' ? this.piezasVencidas : this.piezasStockBajo,
      tipo: tipo
    }
  });
  await popover.present();
}
}
