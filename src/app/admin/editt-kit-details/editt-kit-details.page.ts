import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavParams } from '@ionic/angular';
import { AdmPiezasService } from 'src/app/services/adm-piezas.service';
import { ComboboxesService } from 'src/app/services/comboboxes.service';


@Component({
  selector: 'app-editt-kit-details',
  templateUrl: './editt-kit-details.page.html',
  styleUrls: ['./editt-kit-details.page.scss'],
  standalone: false
})
export class EdittKitDetailsPage implements OnInit {
  id_kit!: number;
  id_usuario!: number;
  pieza!: any;

  piezasDisponibles: any[] = [];

  id_pieza!: number;
  cantidad: number | null = null;
  cantidadOriginal: number = 0;

  errores: any = {};

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private piezaService: AdmPiezasService,
    private comboService: ComboboxesService
  ) {
    this.id_kit = this.navParams.get('id_kit');
    this.id_usuario = this.navParams.get('id_usuario');
    this.pieza = this.navParams.get('pieza');
  }

  ngOnInit() {
    if (this.pieza) {
      this.id_pieza = this.pieza.id_pieza;
      this.cantidad = this.pieza.cantidad;
      this.cantidadOriginal = this.pieza.cantidad;
    }

    this.comboService.getPiezas().subscribe({
      next: (res) => this.piezasDisponibles = res,
      error: (err) => console.error('Error al cargar piezas', err)
    });
  }

  validarCampos(): boolean {
    this.errores = {};

    if (this.cantidad === null || this.cantidad <= 0 || !Number.isInteger(this.cantidad)) {
      this.errores.cantidad = 'Ingrese una cantidad válida (> 0).';
    }

    return Object.keys(this.errores).length === 0;
  }

  guardar() {
    if (!this.validarCampos()) return;

    if (this.cantidad === this.cantidadOriginal) {
      this.presentAlert('Sin cambios', 'No se ha modificado la cantidad.');
      return;
    }

    const data = {
      id_kit: this.id_kit,
      id_pieza: this.id_pieza,
      cantidad: this.cantidad
    };

    this.piezaService.actualizarPiezaEnKit(this.id_usuario, data).subscribe({
      next: () => {
        this.presentAlert('Éxito', 'Cantidad actualizada correctamente.');
        this.modalCtrl.dismiss({ recargar: true });
      },
      error: (err) => {
        console.error('Error al actualizar cantidad:', err);
        this.presentAlert('Error', err?.error?.detail || 'No se pudo actualizar la cantidad.');
      }
    });
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  clearCantidad() {
    this.cantidad = null;
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}