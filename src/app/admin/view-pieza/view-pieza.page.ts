import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ComboboxesService } from 'src/app/services/comboboxes.service';

@Component({
  selector: 'app-view-pieza',
  templateUrl: './view-pieza.page.html',
  styleUrls: ['./view-pieza.page.scss'],
  standalone: false
})
export class ViewPiezaPage implements OnInit {
  pieza: any;

  categorias: any[] = [];
  marcas: any[] = [];
  almacenes: any[] = [];

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private comboService: ComboboxesService
  ) {
    this.pieza = this.navParams.get('pieza');
  }

  ngOnInit() {


    this.comboService.getCategorias().subscribe(res => this.categorias = res);
    this.comboService.getMarcas().subscribe(res => this.marcas = res);
    this.comboService.getAlmacenes().subscribe(res => this.almacenes = res);    
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
