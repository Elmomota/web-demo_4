import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { Usuario } from 'src/app/models/usuario';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  correoNickname: string = '';
  contrasena: string = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

loginUsuario() {
  if (!this.correoNickname || !this.contrasena) {
    this.mostrarAlerta('Por favor, ingresa tus credenciales.');
    return;
  }

  this.authService.loginUsuario(this.correoNickname, this.contrasena).subscribe({
    next: (usuario: Usuario) => {
      console.log('Usuario recibido:', usuario);

      this.storageService.guardarSesion(usuario).then(() => {
        // Filtrado por tipo de usuario (id_tipo_usuario)
        switch (usuario.id_tipo_usuario) {
          case 1: // Admin
            this.navCtrl.navigateForward('/admin-dashboard', {
              queryParams: { usuario: JSON.stringify(usuario) }
            });
            break;
          case 2: // Bodeguero
            this.navCtrl.navigateForward('/bodega', {
              queryParams: { usuario: JSON.stringify(usuario) }
            });
            break;
          case 3: // Contador
            this.navCtrl.navigateForward('/contador', {
              queryParams: { usuario: JSON.stringify(usuario) }
            });
            break;
          case 4: // Cliente
            this.navCtrl.navigateForward('/home', {
              queryParams: { usuario: JSON.stringify(usuario) }
            });
            break;
          default:
            this.mostrarAlerta('Tipo de usuario no reconocido.');
            break;
        }
      });
    },
    error: (error) => {
      console.error('Error completo:', error);
      if (error.status === 401) {
        this.mostrarAlerta('Credenciales incorrectas.');
      } else if (error.status === 404) {
        this.mostrarAlerta('Usuario no encontrado.');
      } else if (error.error?.detail) {
        this.mostrarAlerta(error.error.detail);
      } else {
        this.mostrarAlerta('Ocurrió un error inesperado. Intenta nuevamente.');
      }
    }
  });
}


  irRegistro() {
    console.log('Botón de registro presionado');
    // Redirige a la vista de registro si la tienes
    // this.navCtrl.navigateForward('/registro');
  }

  irPagina() {
     this.navCtrl.navigateForward('/recuperar-cuenta');
    // Puedes implementar navegación aquí también
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}
