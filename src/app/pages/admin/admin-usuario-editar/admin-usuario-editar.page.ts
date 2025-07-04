import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminUsuarioService } from 'src/app/services/admin-usuario.service';
import { ComboboxesService } from 'src/app/services/comboboxes.service';
import { firstValueFrom, forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-usuario-editar',
  templateUrl: './admin-usuario-editar.page.html',
  styleUrls: ['./admin-usuario-editar.page.scss'],
  standalone: false
})
export class AdminUsuarioEditarPage implements OnInit {
  usuarioForm!: FormGroup;
  usuario: any;

  regiones: any[] = [];
  comunas: any[] = [];
  tiposUsuario: any[] = [];
  almacenes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private adminUsuarioService: AdminUsuarioService,
    private comboService: ComboboxesService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

async ngOnInit() {
  // Obtener usuario desde navigation state
  const nav = this.router.getCurrentNavigation();
  console.log('NAVIGATION:', nav); // ✅ DEBUG

  if (!nav?.extras.state?.['usuario']) {
    console.error('No se recibió el usuario en navigation state');
    return;
  }

  this.usuario = nav.extras.state['usuario'];
  console.log('USUARIO:', this.usuario); // ✅ DEBUG

  // Obtener regiones, tipos y almacenes en paralelo
  const [regiones, tiposUsuario, almacenes] = await firstValueFrom(
    forkJoin([
      this.comboService.getRegiones(),
      this.comboService.getTiposUsuario(),
      this.comboService.getAlmacenes()
    ])
  );

  this.regiones = regiones;
  this.tiposUsuario = tiposUsuario;
  this.almacenes = almacenes;

  // Obtener id_region a partir de id_comuna
  const region = regiones.find(r =>
    r.comunas?.some((c: any) => c.id_comuna === this.usuario.id_comuna)
  );
  const id_region = region?.id_region ?? null;
  this.usuario.id_region = id_region;

  // Cargar comunas si se encontró región
  if (id_region) {
    this.comunas = await firstValueFrom(this.comboService.getComunas(id_region));
  }

  // 🔁 Asegurar que todos los IDs son number (por compatibilidad con ion-select)
  this.usuario.id_region = Number(this.usuario.id_region);
  this.usuario.id_comuna = Number(this.usuario.id_comuna);
  this.usuario.id_tipo_usuario = Number(this.usuario.id_tipo_usuario);
  this.usuario.id_almacen = Number(this.usuario.id_almacen);

  // Debug opcional
  console.log('Comprobación de tipos e IDs:', {
    region: this.usuario.id_region,
    comuna: this.usuario.id_comuna,
    tipo: this.usuario.id_tipo_usuario,
    almacen: this.usuario.id_almacen,
    tipo_region: typeof this.usuario.id_region,
  });

  // Inicializar el formulario
  this.initForm();
}



  initForm() {
    this.usuarioForm = this.fb.group({
      p_nombre: [this.usuario.p_nombre, Validators.required],
      s_nombre: [this.usuario.s_nombre ?? '', []],
      a_paterno: [this.usuario.a_paterno, Validators.required],
      a_materno: [this.usuario.a_materno ?? '', []],
      correo: [this.usuario.correo, [Validators.required, Validators.email]],
      direccion: [this.usuario.direccion ?? '', []],
      id_region: [this.usuario.id_region, Validators.required],
      id_comuna: [this.usuario.id_comuna, Validators.required],
      id_tipo_usuario: [this.usuario.id_tipo_usuario, Validators.required],
      id_almacen: [this.usuario.id_almacen ?? null, Validators.required]
    });

    console.log('Form preseleccionado:', this.usuarioForm.value);
  }

  cargarComunas(id_region: number) {
    this.comboService.getComunas(id_region).subscribe(data => {
      this.comunas = data;

      // Mantener la comuna si aún es válida
      const currentComuna = this.usuarioForm.get('id_comuna')?.value;
      const comunaValida = data.some(c => c.id_comuna === currentComuna);
      if (!comunaValida) {
        this.usuarioForm.get('id_comuna')?.setValue(null);
      }
    });
  }

 async guardarCambios() {
  if (this.usuarioForm.invalid) {
    this.usuarioForm.markAllAsTouched();
    return;
  }

  const { id_region, ...formValues } = this.usuarioForm.value;

  const datosActualizados = {
    id_usuario: this.usuario.id_usuario,
    ...formValues,
    estado: this.usuario.estado ?? true // ✅ IMPORTANTE: enviar el estado actual
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
