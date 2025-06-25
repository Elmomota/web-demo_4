import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { AdmPiezasService } from 'src/app/services/adm-piezas.service';
import { AddKitPage } from '../add-kit/add-kit.page';
import { EditKitPage } from '../edit-kit/edit-kit.page';
import { ViewKitPage } from '../view-kit/view-kit.page';
import { Router } from '@angular/router'

@Component({
  selector: 'app-list-kits',
  templateUrl: './list-kits.page.html',
  styleUrls: ['./list-kits.page.scss'],
  standalone: false
})
export class ListKitsPage implements OnInit {
  kits: any[] = [];
  id_usuario: number = 1;

  constructor(
    private kitService: AdmPiezasService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  async ngOnInit() {
    this.cargarKits();
  }

  cargarKits() {
    this.kitService.listarKits(this.id_usuario).subscribe({
      next: (res) => this.kits = res,
      error: (err) => console.error('Error al cargar kits:', err)
    });
  }

  async abrirModalAgregar() {
    const modal = await this.modalCtrl.create({
      component: AddKitPage,
      componentProps: { id_usuario: this.id_usuario }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data?.recargar) this.cargarKits();
  }

async presentActionSheet(kit: any) {
  const botones: any[] = [
    {
      text: 'Ver',
      icon: 'eye',
      handler: () => this.abrirModalVer(kit)
    },
    {
      text: 'Ver productos',
      icon: 'list',
      handler: () => this.irADetalleKit(kit)
    }
  ];

  if (kit.estado) {
    botones.push(
      {
        text: 'Editar',
        icon: 'create',
        handler: () => this.abrirModalEditar(kit)
      },
      {
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => this.confirmarEliminacion(kit)
      }
    );
  }

  botones.push({
    text: 'Cancelar',
    icon: 'close',
    role: 'cancel'
  });

  const actionSheet = await this.actionSheetCtrl.create({
    header: `Kit: ${kit.nombre}`,
    buttons: botones
  });

  await actionSheet.present();
}


  async abrirModalVer(kit: any) {
    const modal = await this.modalCtrl.create({
      component: ViewKitPage,
      componentProps: { kit }
    });
    await modal.present();
  }

  async abrirModalEditar(kit: any) {
    const modal = await this.modalCtrl.create({
      component: EditKitPage,
      componentProps: { kit, id_usuario: this.id_usuario }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data?.recargar) this.cargarKits();
  }

  async confirmarEliminacion(kit: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: `¿Seguro que deseas eliminar el kit "${kit.nombre}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => this.eliminarKit(kit)
        }
      ]
    });
    await alert.present();
  }

  eliminarKit(kit: any) {
    this.kitService.eliminarKit(this.id_usuario, kit.id_kit).subscribe({
      next: () => this.cargarKits(),
      error: (err) => {
        console.error('Error al eliminar kit:', err);
        this.presentAlert('Error', 'No se pudo eliminar el kit.');
      }
    });
  }


irADetalleKit(kit: any) {
this.router.navigate(['/list-kit-details'], {
  state: {
    id_kit: kit.id_kit,
    nombre: kit.nombre,
    id_usuario: this.id_usuario,
    estado: kit.estado

  }});
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


