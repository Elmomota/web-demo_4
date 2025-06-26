import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioExtendido } from 'src/app/models/usuario-extendido';
import { AdminUsuarioService } from 'src/app/services/admin-usuario.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
  standalone: false
})
export class PerfilUsuarioPage implements OnInit {
  usuario: UsuarioExtendido | null = null;

  constructor(
    private route: ActivatedRoute,
    private adminUsuarioService: AdminUsuarioService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['usuario']) {
        this.usuario = JSON.parse(params['usuario']);
      }
    });
  }

  jsonStringify(obj: any): string {
    return JSON.stringify(obj);
  }

async eliminarUsuario() {
  if (!this.usuario) return;  // ✅ Protección segura

  const alert = await this.alertCtrl.create({
    header: '¿Estás seguro?',
    message: 'El usuario será marcado como inactivo.',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
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
