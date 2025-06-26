import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { AdmPiezasService } from 'src/app/services/adm-piezas.service';
import { ComboboxesService } from 'src/app/services/comboboxes.service';

@Component({
  selector: 'app-edit-pieza',
  templateUrl: './edit-pieza.page.html',
  styleUrls: ['./edit-pieza.page.scss'],
  standalone: false
})
export class EditPiezaPage implements OnInit {
  pieza: any;

  originalData: any;

  nombre = '';
  descripcion = '';
  numero_serie = '';
  stock_minimo: number | null = null;
  fecha_vencimiento: string | null = null;
  id_marca: number | null = null;
  id_categoria: number | null = null;
  id_almacen: number | null = null;

  imagenOut: string | null = null;
  imagenOriginal: string | null = null;
  nuevaImagen: string | null = null;

  marcas: any[] = [];
  categorias: any[] = [];
  almacenes: any[] = [];

  errores: any = {};

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private piezaService: AdmPiezasService,
    private comboService: ComboboxesService,
    private alertCtrl: AlertController
  ){
    this.pieza = this.navParams.get('pieza');
  }

  ngOnInit() {
    this.comboService.getMarcas().subscribe(res => this.marcas = res);
    this.comboService.getCategorias().subscribe(res => this.categorias = res);
    this.comboService.getAlmacenes().subscribe(res => this.almacenes = res);

    if (this.pieza) {
      this.nombre = this.pieza.nombre;
      this.descripcion = this.pieza.descripcion;
      this.numero_serie = this.pieza.numero_serie;
      this.stock_minimo = this.pieza.stock_minimo;
      this.fecha_vencimiento = this.pieza.fecha_vencimiento;
      this.id_marca = this.pieza.id_marca;
      this.id_categoria = this.pieza.id_categoria;
      this.id_almacen = this.pieza.id_almacen;
      this.imagenOut = this.pieza.imagenOut || null;
      this.imagenOriginal = this.imagenOut;

      this.originalData = {
        nombre: this.pieza.nombre.trim(),
        descripcion: this.pieza.descripcion.trim(),
        numero_serie:this.pieza.numero_serie.trim(),
        stock_minimo:this.pieza.stock_minimo,
        fecha_vencimiento : this.pieza.fecha_vencimiento,
        id_marca : this.pieza.id_marca,
        id_categoria : this.pieza.id_categoria,
        id_almacen : this.pieza.id_almacen,
        imagenOut : this.pieza.imagenOut,
        imagenOriginal : this.imagenOut
      };
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.nuevaImagen = reader.result as string;
        this.imagenOut = this.nuevaImagen.split(',')[1];
      };
      reader.readAsDataURL(file);
    } else {
      this.presentAlert('Error', 'El archivo debe ser una imagen válida.');
    }
  }

  eliminarImagen() {
    this.imagenOut = null;
    this.nuevaImagen = null;
  }



  validarCampos(): boolean {
  this.errores = {};
  const textoRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s.,-]{5,}$/;
  const hoy = new Date().toISOString().split('T')[0];

  if (!this.nombre || this.nombre.trim().length < 5 || this.nombre.length > 100 || !textoRegex.test(this.nombre)) {
    this.errores.nombre = 'Debe tener entre 5 y 100 caracteres válidos.';
  }

  if (this.descripcion && (!textoRegex.test(this.descripcion) || this.descripcion.length < 10 || this.descripcion.length > 250)) {
    this.errores.descripcion = 'Minimo 10 caracteres y máximo 250 caracteres válidos.';
  }

  if (this.numero_serie && this.numero_serie.length > 100) {
    this.errores.numero_serie = 'Máximo 100 caracteres.';
  }

  if (this.stock_minimo === null || this.stock_minimo < 1 || !Number.isInteger(this.stock_minimo)) {
    this.errores.stock_minimo = 'Debe ser un número entero mayor o igual a 1.';
  }

  if (this.fecha_vencimiento && this.fecha_vencimiento < hoy) {
    this.errores.fecha_vencimiento = 'No se puede asignar una fecha vencida.';
  }

  if (!this.id_categoria) this.errores.id_categoria = 'Campo obligatorio.';
  if (!this.id_marca) this.errores.id_marca = 'Campo obligatorio.';
  if (!this.id_almacen) this.errores.id_almacen = 'Campo obligatorio.';

  return Object.keys(this.errores).length === 0;
}


guardar() {
  if (!this.validarCampos()) return;

  const currentData = {
    nombre: this.nombre.trim(),
    descripcion: this.descripcion?.trim() || '',
    numero_serie: this.numero_serie?.trim() || '',
    stock_minimo: this.stock_minimo,
    fecha_vencimiento: this.fecha_vencimiento || null,
    id_marca: this.id_marca,
    id_categoria: this.id_categoria,
    id_almacen: this.id_almacen,
    imagen: this.imagenOut || null
  };

const o = this.originalData;
const huboCambios =
  currentData.nombre !== o.nombre ||
  currentData.descripcion !== o.descripcion ||
  currentData.numero_serie !== o.numero_serie ||
  currentData.stock_minimo !== o.stock_minimo ||
  currentData.fecha_vencimiento !== o.fecha_vencimiento ||
  currentData.id_marca !== o.id_marca ||
  currentData.id_categoria !== o.id_categoria ||
  currentData.id_almacen !== o.id_almacen ||
  currentData.imagen !== o.imagenOriginal;

  if (!huboCambios) {
    this.presentAlert('Sin cambios', 'No se ha modificado ningún campo.');
    return;
  }

  // ⚠️ Aquí aseguramos que el payload cumpla con el modelo exacto
  const payload: any = {
    nombre: currentData.nombre,
    id_marca: currentData.id_marca,
    descripcion: currentData.descripcion,
    numero_serie: currentData.numero_serie,
    imagen_referencial: currentData.imagen || null,
    stock_minimo: currentData.stock_minimo,
    fecha_vencimiento: currentData.fecha_vencimiento,
    id_categoria: currentData.id_categoria,
    id_almacen: currentData.id_almacen,
    
  };


  this.piezaService.editarPieza(this.pieza.id_usuario || 1, this.pieza.id_pieza, payload).subscribe({
    next: () => {
      this.presentAlert('Éxito', 'Pieza actualizada correctamente.');
      this.modalCtrl.dismiss({ recargar: true });
    },
    error: (err) => {
      console.error('Error al actualizar pieza:', err);
      this.presentAlert('Error', 'No se pudo actualizar la pieza.');
    }
  });
}


  cerrar() {
    this.modalCtrl.dismiss();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

clearNombre() { this.nombre = ''; }
clearDescripcion() { this.descripcion = ''; }
clearSerie() { this.numero_serie = ''; }
clearFecha() { this.fecha_vencimiento = ''; }

}

