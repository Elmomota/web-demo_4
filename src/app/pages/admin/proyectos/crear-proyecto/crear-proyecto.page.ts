import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { ComboboxesService } from 'src/app/services/comboboxes.service';
import { AdminUsuarioService } from 'src/app/services/admin-usuario.service';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.page.html',
  styleUrls: ['./crear-proyecto.page.scss'],
  standalone: false
})
export class CrearProyectoPage implements OnInit {
  form = {
    nombre: '',
    descripcion: '',
    fecha_fin: '',
    id_estado: null,
    id_usuario_responsable: null
  };

  estados: any[] = [];
  usuarios: any[] = [];

  constructor(
    private proyectosService: ProyectosService,
    private comboService: ComboboxesService,
    private usuariosService: AdminUsuarioService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.comboService.getEstadosProyecto().subscribe({
      next: (res: any[]) => this.estados = res,
      error: () => this.mostrarToast('Error al cargar estados', 'danger')
    });

    this.usuariosService.listarUsuarios().subscribe({
      next: (res: any[]) => this.usuarios = res,
      error: () => this.mostrarToast('Error al cargar usuarios', 'danger')
    });
  }

  crearProyecto() {
    const payload = {
      nombre: this.form.nombre,
      descripcion: this.form.descripcion || '',
      fecha_inicio: new Date().toISOString().split('T')[0], // yyyy-mm-dd
      fecha_fin: this.form.fecha_fin?.split('T')[0],         // yyyy-mm-dd
      id_estado: this.form.id_estado,
      id_usuario_responsable: this.form.id_usuario_responsable
    };

    this.proyectosService.crearProyecto(payload).subscribe({
      next: async () => {
        await this.mostrarToast('Proyecto creado exitosamente', 'success');
        this.navCtrl.back();
      },
      error: async (err) => {
        console.error('Error al crear proyecto:', err);
        await this.mostrarToast('Error al crear proyecto', 'danger');
      }
    });
  }

  private async mostrarToast(msg: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastCtrl.create({
      message: msg,
      color,
      duration: 2000
    });
    await toast.present();
  }
}
