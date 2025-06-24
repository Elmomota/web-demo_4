import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AdminUsuarioService } from 'src/app/services/admin-usuario.service';
import { AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-usuario-editar',
  templateUrl: './admin-usuario-editar.page.html',
  styleUrls: ['./admin-usuario-editar.page.scss'],
  standalone: false
})
export class AdminUsuarioEditarPage implements OnInit {
  usuarioForm!: FormGroup;
  usuario!: Usuario;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private adminUsuarioService: AdminUsuarioService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['usuario']) {
        this.usuario = JSON.parse(params['usuario']);
        this.initForm();
      }
    });
  }

  initForm() {
    this.usuarioForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      correo: [this.usuario.correo, [Validators.required, Validators.email]],
      direccion: [this.usuario.direccion],
      id_comuna: [this.usuario.id_comuna, Validators.required],
      id_tipo_usuario: [this.usuario.id_tipo_usuario, Validators.required],
      id_almacen: [this.usuario.id_almacen],
      estado: [this.usuario.estado, Validators.required]
    });
  }

 async guardarCambios() {
  if (this.usuarioForm.invalid) {
    this.usuarioForm.markAllAsTouched();
    return;
  }

  const datosActualizados = {
    id_usuario: this.usuario.id_usuario,
    ...this.usuarioForm.value
  };

  this.adminUsuarioService.editarUsuario(datosActualizados).subscribe({
    next: async () => {
      const toast = await this.toastCtrl.create({
        message: 'Usuario actualizado correctamente',
        duration: 2000,
        color: 'success'
      });
      await toast.present();
      this.router.navigateByUrl('/usuarios');  // ✅ Corregido
    },
    error: async (err) => {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'No se pudo actualizar el usuario.',
        buttons: ['OK']
      });
      await alert.present();
      console.error(err);
    }
  });
}

}
