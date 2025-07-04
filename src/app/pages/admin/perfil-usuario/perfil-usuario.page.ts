import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminUsuarioService } from 'src/app/services/admin-usuario.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
  standalone: false
})
export class PerfilUsuarioPage implements OnInit {
  usuario: Usuario | null = null;

  constructor(
    private route: ActivatedRoute,
    private adminUsuarioService: AdminUsuarioService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

ngOnInit() {
  const nav = this.router.getCurrentNavigation();
  if (nav?.extras?.state && nav.extras.state['usuario']) {
    this.usuario = nav.extras.state['usuario'];
    console.log('Usuario cargado en perfil:', this.usuario); // ✅ verificación
  }
}

  jsonStringify(obj: any): string {
    return JSON.stringify(obj);
  }

  async eliminarUsuario() {
    if (!this.usuario) return;

    const alert = await this.alertCtrl.create({
      header: '¿Estás seguro?',
      message: 'El usuario será marcado como inactivo.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Confirmar',
          handler: () => {
            this.adminUsuarioService.desactivarUsuario(this.usuario!.id_usuario).subscribe({
              next: async () => {
                const toast = await this.toastCtrl.create({
                  message: 'Usuario eliminado correctamente',
                  duration: 2000,
                  color: 'danger'
                });
                await toast.present();
                this.router.navigateByUrl('/usuarios');
              },
              error: err => {
                console.error('Error al eliminar usuario:', err);
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }
}

