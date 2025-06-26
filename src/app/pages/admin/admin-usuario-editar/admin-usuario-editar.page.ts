import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AdminUsuarioService } from 'src/app/services/admin-usuario.service';
import { AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComboboxesService } from 'src/app/services/comboboxes.service';

@Component({
  selector: 'app-admin-usuario-editar',
  templateUrl: './admin-usuario-editar.page.html',
  styleUrls: ['./admin-usuario-editar.page.scss'],
  standalone: false
})
export class AdminUsuarioEditarPage implements OnInit {
  usuarioForm!: FormGroup;
  usuario!: Usuario;
  regiones: any[] = [];
  comunas: any[] = [];
  tiposUsuario: any[] = [];
  almacenes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private adminUsuarioService: AdminUsuarioService,
    private comboBoxService: ComboboxesService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['usuario']) {
        this.usuario = JSON.parse(params['usuario']);
        this.initForm();

        this.comboBoxService.getRegiones().subscribe(regs => {
          this.regiones = regs;

          const comuna = this.usuario.id_comuna;
          const region = regs.find(r =>
            r.comunas?.some((c: any) => c.id_comuna === comuna)
          );
          if (region) {
            this.usuarioForm.patchValue({ id_region: region.id_region });
            this.cargarComunas(region.id_region);
          }
        });

        this.comboBoxService.getTiposUsuario().subscribe(data => this.tiposUsuario = data);
        this.comboBoxService.getAlmacenes().subscribe(data => this.almacenes = data);
      }
    });
  }

  initForm() {
    this.usuarioForm = this.fb.group({
      p_nombre: [this.usuario.p_nombre, Validators.required],
      s_nombre: [this.usuario.s_nombre],
      a_paterno: [this.usuario.a_paterno, Validators.required],
      a_materno: [this.usuario.a_materno],
      correo: [this.usuario.correo, [Validators.required, Validators.email]],
      direccion: [this.usuario.direccion],
      id_region: [null, Validators.required],
      id_comuna: [this.usuario.id_comuna, Validators.required],
      id_tipo_usuario: [this.usuario.id_tipo_usuario, Validators.required],
      id_almacen: [this.usuario.id_almacen, Validators.required],
      estado: [this.usuario.estado, Validators.required]
    });
  }

  cargarComunas(idRegion: number) {
    this.comboBoxService.getComunas(idRegion).subscribe(data => {
      this.comunas = data;
      this.usuarioForm.get('id_comuna')?.setValue(null);
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
        this.router.navigateByUrl('/usuarios');
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
