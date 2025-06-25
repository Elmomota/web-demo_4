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
    const actionSheet = await this.actionSheetCtrl.create({
      header: p.nombre_pieza,
      buttons: [
        {
          text: 'Ver pieza',
          icon: 'eye',
          handler: () => this.verPieza(p)
        },
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
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  verPieza(p: any) {
    // Por ahora solo log, puedes enlazar a `view-pieza` si quieres
    console.log('Ver pieza:', p);
  }

  async abrirModalEditar(p: any) {
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
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: `¿Eliminar la pieza <strong>${p.nombre_pieza}</strong> del kit?`,
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