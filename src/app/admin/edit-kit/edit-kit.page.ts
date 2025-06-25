import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavParams } from '@ionic/angular';
import { AdmPiezasService } from 'src/app/services/adm-piezas.service';

@Component({
  selector: 'app-edit-kit',
  templateUrl: './edit-kit.page.html',
  styleUrls: ['./edit-kit.page.scss'],
  standalone: false
})
export class EditKitPage implements OnInit {
  kit: any;
  id_usuario: number = 0;

  nombre = '';
  descripcion = '';

  originalData: any;
  errores: any = {};

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private kitService: AdmPiezasService
  ) {
    this.kit = this.navParams.get('kit');
    this.id_usuario = this.navParams.get('id_usuario');
  }
  ngOnInit() {
    if (this.kit) {
      this.nombre = this.kit.nombre;
      this.descripcion = this.kit.descripcion;

      this.originalData = {
        nombre: this.kit.nombre.trim(),
        descripcion: this.kit.descripcion?.trim() || ''
      };
    }
  }

  validarCampos(): boolean {
    this.errores = {};
    const textoRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s.,-]{3,}$/;

    if (!this.nombre || this.nombre.trim().length < 3 || this.nombre.length > 100 || !textoRegex.test(this.nombre)) {
      this.errores.nombre = 'Debe tener entre 3 y 100 caracteres válidos.';
    }

    if (this.descripcion && (this.descripcion.length < 5 || this.descripcion.length > 200)) {
      this.errores.descripcion = 'Mínimo 5 y máximo 200 caracteres.';
    }

    return Object.keys(this.errores).length === 0;
  }


  guardar() {
    if (!this.validarCampos()) return;

    const currentData = {
      nombre: this.nombre.trim(),
      descripcion: this.descripcion?.trim() || ''
    };

    const o = this.originalData;
    const huboCambios =
      currentData.nombre !== o.nombre ||
      currentData.descripcion !== o.descripcion;

    if (!huboCambios) {
      this.presentAlert('Sin cambios', 'No se ha modificado ningún campo.');
      return;
    }

    const payload = {
      nombre: currentData.nombre,
      descripcion: currentData.descripcion || null
    };

    this.kitService.editarKit(this.id_usuario, this.kit.id_kit, payload).subscribe({
      next: () => {
        this.presentAlert('Éxito', 'Kit actualizado correctamente.');
        this.modalCtrl.dismiss({ recargar: true });
      },
      error: (err) => {
        console.error('Error al actualizar kit:', err);
        this.presentAlert('Error', 'No se pudo actualizar el kit.');
      }
    });
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  clearNombre() { this.nombre = ''; }
  clearDescripcion() { this.descripcion = ''; }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}