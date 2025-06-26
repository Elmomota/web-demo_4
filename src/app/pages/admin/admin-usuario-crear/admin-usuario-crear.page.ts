import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComboboxesService } from 'src/app/services/comboboxes.service';
import { AdminUsuarioService } from 'src/app/services/admin-usuario.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-usuario-crear',
  templateUrl: './admin-usuario-crear.page.html',
  styleUrls: ['./admin-usuario-crear.page.scss'],
  standalone: false
})
export class AdminUsuarioCrearPage implements OnInit {
  usuarioForm!: FormGroup;
  regiones: any[] = [];
  comunas: any[] = [];
  tiposUsuario: any[] = [];
  almacenes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private comboBoxService: ComboboxesService,
    private adminUsuarioService: AdminUsuarioService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.comboBoxService.getRegiones().subscribe(data => this.regiones = data);
    this.comboBoxService.getTiposUsuario().subscribe(data => this.tiposUsuario = data);
    this.comboBoxService.getAlmacenes().subscribe(data => this.almacenes = data);
  }

  initForm() {
    this.usuarioForm = this.fb.group({
      p_nombre: ['', Validators.required],
      s_nombre: [''],
      a_paterno: ['', Validators.required],
      a_materno: [''],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmar_contrasena: ['', Validators.required],
      direccion: [''],
      id_region: [null, Validators.required],
      id_comuna: [null, Validators.required],
      id_tipo_usuario: [null, Validators.required],
      id_almacen: [null]
    }, {
      validators: this.coincidenContrasenas('contrasena', 'confirmar_contrasena')
    });
  }

  cargarComunas(idRegion: number) {
    this.comboBoxService.getComunas(idRegion).subscribe(data => {
      this.comunas = data;
      this.usuarioForm.get('id_comuna')?.setValue(null);
    });
  }

  crearUsuario() {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    const {
      id_region,             // no se envía
      confirmar_contrasena,  // no se envía
      ...formData
    } = this.usuarioForm.value;

    this.adminUsuarioService.crearUsuario(formData).subscribe({
      next: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Usuario creado correctamente.',
          duration: 2000,
          color: 'success'
        });
        await toast.present();
        this.router.navigateByUrl('/usuarios');
      },
      error: async (err) => {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: err.error?.detail || 'No se pudo crear el usuario.',
          buttons: ['OK']
        });
        await alert.present();
        console.error(err);
      }
    });
  }

  coincidenciasInvalidas() {
    const control = this.usuarioForm.get('confirmar_contrasena');
    return control?.touched && control.hasError('noCoincide');
  }

  coincidenContrasenas(campo1: string, campo2: string) {
    return (formGroup: FormGroup) => {
      const pass1 = formGroup.get(campo1);
      const pass2 = formGroup.get(campo2);
      if (pass1 && pass2 && pass1.value !== pass2.value) {
        pass2.setErrors({ noCoincide: true });
      } else {
        pass2?.setErrors(null);
      }
    };
  }
}
