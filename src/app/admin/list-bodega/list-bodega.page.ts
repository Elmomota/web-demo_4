import { Component, OnInit } from '@angular/core';
import { AdmBodegaService } from 'src/app/services/adm-bodega.service';
import { ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { AddBodegaPage } from '../add-bodega/add-bodega.page';
import { EditBodegaPage } from '../edit-bodega/edit-bodega.page';
import { ViewBodegaPage } from '../view-bodega/view-bodega.page';


@Component({
  selector: 'app-list-bodega',
  templateUrl: './list-bodega.page.html',
  styleUrls: ['./list-bodega.page.scss'],
  standalone: false
})
export class ListBodegaPage implements OnInit {
  bodegas: any[] = [];

  constructor(private bodegasService: AdmBodegaService, 
              private modalCtrl: ModalController,
              private actionSheetController: ActionSheetController, 
              private alertCtrl: AlertController) { }  

  
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.cargarBodegas();
  }


  cargarBodegas() {
    this.bodegasService.listarBodegas().subscribe(res => {
      this.bodegas = res;
    });
  }

  async abrirModalAgregar() {
    const modal = await this.modalCtrl.create({
      component: AddBodegaPage,
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data?.recargar) this.cargarBodegas();
  }


  async abrirModalEditar(bodega: any) {
  const modal = await this.modalCtrl.create({
    component: EditBodegaPage,
    componentProps: { bodega }
  });
  await modal.present();
  const { data } = await modal.onDidDismiss();
  if (data?.recargar) {
    this.cargarBodegas();
  }}

  async abrirVisualizar(bodega: any){ 
  const modal = await this.modalCtrl.create({
    component: ViewBodegaPage,
    componentProps: { bodega }
  });
  await modal.present();
  }



  async eliminar(bodega: any) {
    const alerta = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Deseas eliminar la bodega "${bodega.nombre}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.bodegasService.eliminarBodega(bodega.id_almacen).subscribe(() => {
              this.cargarBodegas();
            });
          }
        }
      ]
    });
    await alerta.present();
  }

  async presentActionSheet(bodega: any) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Modificar',
          icon: 'create-outline',
          handler: () => this.abrirModalEditar(bodega)
        },
        {
          text: 'Visualizar',
          icon: 'eye-outline',
          handler: () => this.abrirVisualizar(bodega)
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => this.eliminar(bodega)
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: 'close'
        }
      ]
    });
    await actionSheet.present();
  }

}
