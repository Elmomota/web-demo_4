import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams} from '@ionic/angular';
import { AdmBodegaService } from 'src/app/services/adm-bodega.service';
import { ComboboxesService } from 'src/app/services/comboboxes.service';


@Component({
  selector: 'app-view-bodega',
  templateUrl: './view-bodega.page.html',
  styleUrls: ['./view-bodega.page.scss'],
  standalone: false
})
export class ViewBodegaPage implements OnInit {
  isDisabled = true;

  
  bodega: any;

  nombre = '';
  direccion = '';
  id_region: number | null = null;
  id_comuna: number | null = null;

  regiones: any[] = [];
  comunas: any[] = [];

  constructor(
      private navParams: NavParams,
      private modalCtrl: ModalController,
      private bodegaService: AdmBodegaService,
      private comboService: ComboboxesService
  )  { 
    this.bodega = this.navParams.get('bodega')
  }

  ngOnInit() {

    this.cargarRegiones();
    this.nombre = this.bodega.nombre;
    this.direccion = this.bodega.direccion;
    this.id_comuna = this.bodega.id_comuna;
    this.id_region = this.bodega.id_region;

    this.comboService.getComunas(this.id_region!).subscribe(res => {
      this.comunas = res;
    });
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

  cerrar() {
    this.modalCtrl.dismiss();
  }
  


}
