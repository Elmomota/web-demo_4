import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recuperar-cuenta',
  templateUrl: './recuperar-cuenta.page.html',
  styleUrls: ['./recuperar-cuenta.page.scss'],
  standalone: false
})
export class RecuperarCuentaPage {
  correo: string = '';

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  enviarCodigo() {
    if (!this.correo) {
      this.mostrarAlerta('Por favor, ingresa un correo.');
      return;
    }

    const formData = new FormData();
    formData.append('correo', this.correo);

    this.authService.enviarCodigoRecuperacion(formData).subscribe({
      next: () => {
        this.mostrarAlerta('Se ha enviado un código de verificación a tu correo.');
        this.navCtrl.navigateForward('/verificar-codigo', {
          queryParams: { correo: this.correo }
        });
      },
      error: (error) => {
        console.error(error);
        if (error.status === 404) {
          this.mostrarAlerta('El correo ingresado no está asociado a ninguna cuenta.');
        } else {
          this.mostrarAlerta('Error al enviar el código. Intenta más tarde.');
        }
      }
    });
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Información',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}
