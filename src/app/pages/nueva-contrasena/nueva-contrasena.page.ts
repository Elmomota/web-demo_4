import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nueva-contrasena',
  templateUrl: './nueva-contrasena.page.html',
  styleUrls: ['./nueva-contrasena.page.scss'],
  standalone: false
})
export class NuevaContrasenaPage implements OnInit {
  correo: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';


  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private navCtrl: NavController,
    private authService: AuthService,
    private router: Router
  ) {}


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.correo = params['correo'] || '';
    });
  }
  cambiarContrasena() {
    if (!this.nuevaContrasena || !this.confirmarContrasena){
      this.mostrarAlerta('Por favor, completa todos los campos.');
      return;
    }
    if (this.nuevaContrasena !== this.confirmarContrasena) {
      this.mostrarAlerta('Las contraseñas no coinciden.');
      return;
    }
    const formData = new FormData();
    formData.append('correo', this.correo);
    formData.append('nueva_contrasena', this.nuevaContrasena);
    this.authService.resetearContrasena(formData).subscribe({
      next: () => {
        this.mostrarAlerta('Contraseña cambiada correctamente.');
        this.navCtrl.navigateForward('/login');
      },
      error: (error) => {
        this.mostrarAlerta('Error al cambiar la contraseña. Intenta más tarde.');
        
        }
      });
  }

  async mostrarAlerta(mensaje: string) {
    const alert =await this.alertController.create({
      header: 'Recuperacion de Cuenta',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }


}