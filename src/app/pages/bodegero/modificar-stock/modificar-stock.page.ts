import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AdmBodegaService } from 'src/app/services/adm-bodega.service';
import { ComboboxesService } from 'src/app/services/comboboxes.service';

@Component({
  selector: 'app-modificar-stock',
  templateUrl: './modificar-stock.page.html',
  styleUrls: ['./modificar-stock.page.scss'],
  standalone: false
})
export class ModificarStockPage implements OnInit {
  @Input() pieza: any;
  @Input() id_usuario!: number;

  cantidad: number = 0;
  id_tipo_movimiento: number | null = null;
  observaciones: string = '';

  tiposMovimiento: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private inventarioService: AdmBodegaService,
    private comboService: ComboboxesService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    if (!this.pieza || !this.id_usuario) {
      this.mostrarAlerta('Error: no se recibieron datos necesarios.');
      this.modalCtrl.dismiss();
      return;
    }

    this.cantidad = this.pieza.cantidad;

    this.comboService.getTiposMovimiento().subscribe({
      next: res => {
        this.tiposMovimiento = res.filter(t => [1, 2, 6].includes(t.id_tipo_movimiento));
      },
      error: err => {
        console.error('Error al cargar tipos de movimiento:', err);
        this.mostrarAlerta('Error al cargar tipos de movimiento');
      }
    });
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

async guardar() {
  if (!this.id_tipo_movimiento) {
    return this.mostrarAlerta('Debe seleccionar un tipo de movimiento.');
  }

  // Validación: número entero positivo
  if (this.cantidad === null || this.cantidad === undefined || isNaN(this.cantidad)) {
    return this.mostrarAlerta('Debe ingresar una cantidad válida.');
  }

  if (!Number.isInteger(this.cantidad)) {
    return this.mostrarAlerta('La cantidad debe ser un número entero.');
  }

  if (this.cantidad < 0) {
    return this.mostrarAlerta('La cantidad no puede ser negativa.');
  }

  const cantidad_actual = this.pieza.cantidad;

  if (this.id_tipo_movimiento === 1 && this.cantidad <= cantidad_actual) {
    return this.mostrarAlerta('Para ENTRADA, la nueva cantidad debe ser mayor al stock actual.');
  }

  if (this.id_tipo_movimiento === 2 && this.cantidad >= cantidad_actual) {
    return this.mostrarAlerta('Para SALIDA, la nueva cantidad debe ser menor al stock actual.');
  }

  if (this.id_tipo_movimiento === 6 && this.cantidad === cantidad_actual) {
    return this.mostrarAlerta('Para CORRECCIÓN, la cantidad debe ser distinta al stock actual.');
  }

  const payload = {
    id_pieza: this.pieza.id_pieza,
    cantidad: this.cantidad,
    id_tipo_movimiento: this.id_tipo_movimiento,
    observaciones: this.observaciones
  };

  this.inventarioService.actualizarStock(this.id_usuario, payload).subscribe({
    next: () => this.modalCtrl.dismiss({ recargar: true }),
    error: err => {
      const msg = err.error?.detail || 'Error al actualizar stock.';
      this.mostrarAlerta(msg);
    }
  });
}

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Atención',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}