import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { AdmBodegaService } from 'src/app/services/adm-bodega.service';
import { ComboboxesService } from 'src/app/services/comboboxes.service';

@Component({
  selector: 'app-edit-bodega',
  templateUrl: './edit-bodega.page.html',
  styleUrls: ['./edit-bodega.page.scss'],
  standalone: false
})
export class EditBodegaPage implements OnInit {
  bodega: any;


  originalData: any;


  nombre = '';
  direccion = '';
  id_region: number | null = null;
  id_comuna: number | null = null;

  regiones: any[] = [];
  comunas: any[] = [];

  nombreError = '';
  direccionError = '';
  errorRegion = '';
  errorComuna = '';

  constructor(
    private navParams: NavParams,
    public alertController: AlertController,
    private modalCtrl: ModalController,
    private bodegaService: AdmBodegaService,
    private comboService: ComboboxesService

  ) { 
    this.bodega = this.navParams.get('bodega')
  }

  ngOnInit() {

    this.cargarRegiones();

  

    if (this.bodega) {
      
      this.nombre = this.bodega.nombre;
      this.direccion = this.bodega.direccion;
      this.id_comuna = this.bodega.id_comuna;
      this.id_region = this.bodega.id_region;

      this.originalData = {
        nombre: this.bodega.nombre.trim(),
        direccion: this.bodega.direccion.trim(),
        id_region: this.bodega.id_region,
        id_comuna: this.bodega.id_comuna
      };

      this.comboService.getComunas(this.id_region!).subscribe(res => {
        this.comunas = res;
      });
    }
  }

  cargarRegiones() {
    this.comboService.getRegiones().subscribe(res => {
      this.regiones = res;
    });
  }

  onRegionChange() {
    if (this.id_region) {
      this.comboService.getComunas(this.id_region).subscribe(res => {
        this.comunas = res;
        this.id_comuna = null;
      });
    }
  }

  validarCampos(): boolean {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s.,-]{5,}$/;

    this.nombreError = '';
    this.direccionError = '';

    if (!this.nombre || this.nombre.trim().length < 5 || this.nombre.length > 100 || !regex.test(this.nombre)) {
      this.nombreError = 'El nombre debe tener entre 5 y 100 caracteres y contener solo letras, números y espacios.';
    }

    if (!this.direccion || this.direccion.trim().length < 5 || this.direccion.length > 250 || !regex.test(this.direccion)) {
      this.direccionError = 'La dirección debe tener entre 5 y 250 caracteres y contener solo letras, números y símbolos básicos.';
    }

    if (!this.id_region) {
          this.errorRegion = 'La region es obligatoria';
        }

    if (!this.id_comuna) {
      this.errorComuna = 'La comuna es obligatoria';
    }

    return this.nombreError === '' && this.direccionError === '';
  }

  guardar() {
    if (!this.validarCampos()) return;

    const currentData = {
      nombre: this.nombre.trim(),
      direccion: this.direccion.trim(),
      id_region: this.id_region,
      id_comuna: this.id_comuna
    };

    const o = this.originalData;
    const huboCambios =
      currentData.nombre !== o.nombre ||
      currentData.direccion !== o.direccion ||
      currentData.id_region !== o.id_region ||
      currentData.id_comuna !== o.id_comuna;

    if (!huboCambios) {
      this.presentAlert('Sin cambios', 'No se ha modificado ningún campo.');
      return;
    }

    const payload = {
      nombre: currentData.nombre,
      direccion: currentData.direccion,
      id_comuna: currentData.id_comuna
    };

    this.bodegaService.editarBodega(this.bodega.id_almacen, payload).subscribe(() => {
      this.presentAlert('Éxito', 'Se ha modificado el almacén exitosamente.');
      this.modalCtrl.dismiss({ recargar: true });
    });
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  clearDir(){
    this.direccion = '';
  }

  clearName(){
    this.nombre = '';
  }

}
