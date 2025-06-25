import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AdmBodegaService } from 'src/app/services/adm-bodega.service';
import { ComboboxesService } from 'src/app/services/comboboxes.service';


@Component({
  selector: 'app-add-bodega',
  templateUrl: './add-bodega.page.html',
  styleUrls: ['./add-bodega.page.scss'],
  standalone: false
})
export class AddBodegaPage implements OnInit {
  nombre= '';
  direccion= '';
  id_region: number | null = null;
  id_comuna: number | null = null;

  regiones: any[] = [];
  comunas: any[] = [];


  nombreError = '';
  direccionError = '';
  errorRegion = '';
  errorComuna = '';
  constructor(
    public alertController: AlertController,
    private modalCtrl: ModalController,
    private bodegaService: AdmBodegaService,
    private comboService: ComboboxesService) { }

  ngOnInit() {
    this.cargarRegiones();
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
    this.errorRegion = '';
    this.errorComuna = '';

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
    if (!this.validarCampos() || !this.id_comuna) {
      return;
    }

    const data = {
      nombre: this.nombre.trim(),
      direccion: this.direccion.trim(),
      id_comuna: this.id_comuna
    };

    this.bodegaService.crearBodega(data).subscribe(() => {
      this.presentAlert('Éxito', 'Se ha agregado la Bodega exitosamente.');
      this.modalCtrl.dismiss({ recargar: true });
    });
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  clearDir(){
    this.direccion = '';
  }

  clearName(){
    this.nombre = '';
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
