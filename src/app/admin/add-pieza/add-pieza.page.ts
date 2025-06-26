import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AdmPiezasService } from 'src/app/services/adm-piezas.service';
import { ComboboxesService } from 'src/app/services/comboboxes.service';



@Component({
  selector: 'app-add-pieza',
  templateUrl: './add-pieza.page.html',
  styleUrls: ['./add-pieza.page.scss'],
  standalone: false
})
export class AddPiezaPage implements OnInit {
  id_usuario: number = 1


  nombre = '';
  descripcion = '';
  numero_serie = '';
  stock_minimo: number | null = null;
  id_categoria: number | null = null;
  id_marca: number | null = null;
  id_almacen: number | null = null;
  fecha_vencimiento: string = '';
  cantidad: number = 0;

  imagen_base64: string | null = null;

  categorias: any[] = [];
  marcas: any[] = [];
  almacenes: any[] = [];

  errores: any = {};

  constructor(
    private modalCtrl: ModalController,
    private piezaService: AdmPiezasService,
    private comboService: ComboboxesService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {

    this.comboService.getCategorias().subscribe(res => this.categorias = res);
    this.comboService.getMarcas().subscribe(res => this.marcas = res);
    this.comboService.getAlmacenes().subscribe(res => this.almacenes = res);
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const mime = file.type;
    if (!mime.startsWith('image/')) {
      this.presentAlert('Archivo inválido', 'Solo se permiten imágenes.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.imagen_base64 = (reader.result as string).split(',')[1]; // quitar el encabezado base64
    };
    reader.readAsDataURL(file);
  }

  validarCampos(): boolean {
    this.errores = {};
    const textoRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s.,-]{5,}$/;
    const hoy = new Date().toISOString().split('T')[0];

    if (!this.nombre || this.nombre.trim().length < 5 || this.nombre.length > 100 || !textoRegex.test(this.nombre)) {
      this.errores.nombre = 'Debe tener entre 5 y 100 caracteres válidos.';
    }

    if (this.descripcion && (!textoRegex.test(this.descripcion) ||this.descripcion.length < 10  ||this.descripcion.length > 250  )) {
      this.errores.descripcion = 'Minimo 10 Caracteres y Máximo 250 caracteres válidos.';
    }

    if (this.numero_serie && this.numero_serie.length > 100) {
      this.errores.numero_serie = 'Máximo 100 caracteres.';
    }

    if (this.stock_minimo === null || this.stock_minimo < 1 || !Number.isInteger(this.stock_minimo)) {
      this.errores.stock_minimo = 'Debe ser un número entero mayor o igual a 1.';
    }

    if (this.cantidad < 0 || !Number.isInteger(this.cantidad)) {
      this.errores.cantidad = 'Debe ser un número entero mayor o igual a 0.';
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

    const data = {
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim() || null,
      numero_serie: this.numero_serie.trim() || null,
      imagen: this.imagen_base64,
      stock_minimo: this.stock_minimo,
      id_categoria: this.id_categoria,
      id_marca: this.id_marca,
      fecha_vencimiento: this.fecha_vencimiento || null,
      id_almacen: this.id_almacen,
      cantidad: this.cantidad
    };

    this.piezaService.crearPieza(this.id_usuario, data).subscribe(() => {
      this.modalCtrl.dismiss({ recargar: true });
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

  clearFecha() {
    this.fecha_vencimiento = '';
  }

    eliminarImagen() {
    this.imagen_base64 = null;
  }

}