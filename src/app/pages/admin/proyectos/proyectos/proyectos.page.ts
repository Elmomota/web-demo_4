import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.page.html',
  styleUrls: ['./proyectos.page.scss'],
  standalone: false
})
export class ProyectosPage {
  proyectos: any[] = [];
  cargando = true;

  constructor(
    private proyectosService: ProyectosService,
    private navCtrl: NavController
  ) {}

  // 🔄 Se ejecuta cada vez que la vista se muestra (incluso al volver atrás)
  ionViewWillEnter() {
    this.obtenerProyectos();
  }

  obtenerProyectos() {
    this.cargando = true;
    this.proyectosService.getProyectos().subscribe({
      next: (res: any) => {
        this.proyectos = res;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener proyectos:', err);
        this.cargando = false;
      },
    });
  }

  irADetalle(id: number) {
    this.navCtrl.navigateForward(`/detalle-proyecto/${id}`);
  }

  irACrearProyecto() {
    this.navCtrl.navigateForward('/crear-proyecto');
  }
}
