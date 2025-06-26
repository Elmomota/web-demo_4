import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AdmPiezasService } from 'src/app/services/adm-piezas.service';
import { ComboboxesService } from 'src/app/services/comboboxes.service';

@Component({
  selector: 'app-add-kit-detail',
  templateUrl: './add-kit-detail.page.html',
  styleUrls: ['./add-kit-detail.page.scss'],
  standalone: false
})
export class AddKitDetailPage implements OnInit {
  id_kit!: number;
  id_usuario!: number;

  piezasDisponibles: any[] = [];
  piezasEnKit: any[] = [];

  id_pieza: number | null = null;
  cantidad: number | null = null;
  errores: any = {};

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private piezaService: AdmPiezasService,
    private comboService: ComboboxesService
  ) {}


  ngOnInit() {
    this.cargarPiezasDisponibles();
  }
  cargarPiezasDisponibles() {
    this.comboService.getPiezas().subscribe({
      next: (res) => this.piezasDisponibles = res,
      error: (err) => console.error('Error al cargar piezas disponibles', err)
    });
  }

  validarCampos(): boolean {
    this.errores = {};

    if (!this.id_pieza) {
      this.errores.id_pieza = 'Debe seleccionar una pieza.';
    }

    if (this.cantidad === null || this.cantidad <= 0 || !Number.isInteger(this.cantidad)) {
      this.errores.cantidad = 'Ingrese una cantidad válida (> 0).';
    }

    return Object.keys(this.errores).length === 0;
  }

  guardar() {
    if (!this.validarCampos()) return;

    const data = {
      id_kit: this.id_kit,
      id_pieza: this.id_pieza,
      cantidad: this.cantidad
    };

    this.piezaService.agregarPiezaAKit(this.id_usuario, data).subscribe({
      next: () => {
        this.presentAlert('Éxito', 'Pieza agregada al kit correctamente.');
        this.modalCtrl.dismiss({ recargar: true });
      },
      error: (err) => {
        console.error('Error al agregar pieza:', err);
        const msg = err?.error?.detail || 'No se pudo agregar la pieza.';
        this.presentAlert('Error', msg);
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