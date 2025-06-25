import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { AdmPiezasService } from 'src/app/services/adm-piezas.service';
import { AddPiezaPage } from '../add-pieza/add-pieza.page';
import { EditPiezaPage } from '../edit-pieza/edit-pieza.page';
import { ViewPiezaPage } from '../view-pieza/view-pieza.page';


@Component({
  selector: 'app-list-piezas',
  templateUrl: './list-piezas.page.html',
  styleUrls: ['./list-piezas.page.scss'],
  standalone: false
})
export class ListPiezasPage implements OnInit {
  piezas: any[] = [];
  id_usuario: number = 1
  constructor(
    private piezaService: AdmPiezasService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.cargarPiezas();
  }
  
  cargarPiezas() {
    this.piezaService.listarPiezas(this.id_usuario).subscribe(res => {
      this.piezas = res;
    });
  }

  async abrirModalAgregar() {
    const modal = await this.modalCtrl.create({
      component: AddPiezaPage,
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data?.recargar) this.cargarPiezas();
  }

  async abrirModalEditar(pieza: any) {
    const modal = await this.modalCtrl.create({
      component: EditPiezaPage,
      componentProps: { pieza }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data?.recargar) this.cargarPiezas();
  }

  async abrirVisualizar(pieza: any) {
    const modal = await this.modalCtrl.create({
      component: ViewPiezaPage,
      componentProps: { pieza }
    });
    await modal.present();
  }

  async eliminar(pieza: any) {
    const alerta = await this.alertCtrl.create({
      header: 'Eliminar pieza',
      message: `¿Deseas eliminar la pieza "${pieza.nombre}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.piezaService.eliminarPieza(this.id_usuario, pieza.id_pieza).subscribe(() => {
              this.cargarPiezas();
            });
          }
        }
      ]
    });
    await alerta.present();
  }

  async presentActionSheet(pieza: any) {
    const buttons: any[] = [
      {
        text: 'Visualizar',
        icon: 'eye-outline',
        handler: () => this.abrirVisualizar(pieza)
      }
    ];

    if (pieza.estado) {
      buttons.unshift({
        text: 'Modificar',
        icon: 'create-outline',
        handler: () => this.abrirModalEditar(pieza)
      });

      buttons.push({
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash-outline',
        handler: () => this.eliminar(pieza)
      });
    }

    buttons.push({
      text: 'Cancelar',
      role: 'cancel',
      icon: 'close'
    });

    const sheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons
    });
    await sheet.present();
  }


}

