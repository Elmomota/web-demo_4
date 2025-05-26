import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verificar-codigo',
  templateUrl: './verificar-codigo.page.html',
  styleUrls: ['./verificar-codigo.page.scss'],
  standalone: false
})
export class VerificarCodigoPage implements OnInit {
  correo: string = '';
  codigoIngresado: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private navCtrl: NavController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.correo = params['correo'] || '';
    });
  }

  verificarCodigo() {
    if (!this.codigoIngresado) {
      this.mostrarAlerta('Por favor, ingresa el código de verificación.');
      return;
    }

    const formData = new FormData();
    formData.append('correo', this.correo);
    formData.append('codigo', this.codigoIngresado);

    this.authService.verificarCodigoRecuperacion(formData).subscribe({
      next: () => {
        this.mostrarAlerta('Código verificado correctamente.');
        this.navCtrl.navigateForward('/nueva-contrasena', {
          queryParams: { correo: this.correo }
        });
      },
      error: (error) => {
        if (error.status === 410) {
          this.mostrarAlerta('El código ha expirado.');
        } else if (error.status === 400) {
          this.mostrarAlerta('El código es inválido.');
        } else {
          this.mostrarAlerta('Error inesperado. Intenta nuevamente.');
        }
      }
    });
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Verificación',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}
