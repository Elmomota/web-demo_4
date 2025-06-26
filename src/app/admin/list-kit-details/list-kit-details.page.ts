import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ActionSheetController, ModalController } from '@ionic/angular';
import { AdmPiezasService } from 'src/app/services/adm-piezas.service';
import { AddKitDetailPage } from '../add-kit-detail/add-kit-detail.page';
import { EdittKitDetailsPage } from '../editt-kit-details/editt-kit-details.page';


@Component({
  selector: 'app-list-kit-details',
  templateUrl: './list-kit-details.page.html',
  styleUrls: ['./list-kit-details.page.scss'],
  standalone: false
})
export class ListKitDetailsPage implements OnInit {
  id_kit: number = 0;
  id_usuario: number = 1;
  nombre_kit: string = '';
  piezas: any[] = [];
  estado: boolean = true; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private piezaService: AdmPiezasService,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state;
    if (state) {
      this.id_kit = state['id_kit'];
      this.id_usuario = state['id_usuario'];
      this.nombre_kit = state['nombre'];
      this.estado = state['estado'];
    }
  }

  async ngOnInit() {
    this.cargarDetalle();
  }

  cargarDetalle() {
    this.piezaService.listarKitPiezas(this.id_usuario, this.id_kit).subscribe({
      next: (res) => this.piezas = res,
      error: (err) => console.error('Error al cargar piezas del kit:', err)
    });
  }

  async abrirModalAgregar() {
    if (!this.estado) {
      this.presentAlert('Kit desactivado', 'No se pueden agregar piezas a un kit inactivo.');
      return;
    }

    const modal = await this.modalCtrl.create({
      component: AddKitDetailPage,
      componentProps: {
        id_kit: this.id_kit,
        id_usuario: this.id_usuario
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data?.recargar) this.cargarDetalle();
  }

  async presentActionSheet(p: any) {
    const botones: any[] = [];

    if (this.estado) {
      botones.push(
        {
          text: 'Editar cantidad',
          icon: 'create',
          handler: () => this.abrirModalEditar(p)
        },
        {
          text: 'Eliminar del kit',
          role: 'destructive',
          icon: 'trash',
          handler: () => this.confirmarEliminacion(p)
        }
      );
    }

    botones.push({
      text: 'Cancelar',
      icon: 'close',
      role: 'cancel'
    });

    const actionSheet = await this.actionSheetCtrl.create({
      header: p.nombre_pieza,
      buttons: botones
    });

    await actionSheet.present();
  }

  async abrirModalEditar(p: any) {
    if (!this.estado) {
      this.presentAlert('Kit desactivado', 'No se pueden editar piezas en un kit inactivo.');
      return;
    }

    const modal = await this.modalCtrl.create({
      component: EdittKitDetailsPage,
      componentProps: {
        id_usuario: this.id_usuario,
        id_kit: this.id_kit,
        pieza: p
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data?.recargar) this.cargarDetalle();
  }

  async confirmarEliminacion(p: any) {
    if (!this.estado) {
      this.presentAlert('Kit desactivado', 'No se pueden eliminar piezas de un kit inactivo.');
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: `¿Eliminar la pieza ${p.nombre_pieza} del kit?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => this.eliminar(p)
        }
      ]
    });
    await alert.present();
  }

  eliminar(p: any) {
    if (!this.estado) {
      this.presentAlert('Kit desactivado', 'No se puede eliminar esta pieza porque el kit está inactivo.');
      return;
    }

    this.piezaService.eliminarPiezaDeKit(this.id_usuario, this.id_kit, p.id_pieza).subscribe({
      next: () => this.cargarDetalle(),
      error: (err) => {
        console.error('Error al eliminar pieza del kit:', err);
        this.presentAlert('Error', 'No se pudo eliminar la pieza.');
      }
    });
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
