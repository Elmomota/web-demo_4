import { Component, OnInit } from '@angular/core';
import { AdminUsuarioService } from 'src/app/services/admin-usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  standalone: false
})
export class UsuariosPage implements OnInit {
  usuarios: Usuario[] = [];

  constructor(
    private navCtrl: NavController,
    private adminUsuarioService: AdminUsuarioService
  ) {}

  ngOnInit() {
    // Se ejecuta una sola vez
    this.cargarUsuarios();
  }

  ionViewWillEnter() {
    // Se ejecuta cada vez que entras a esta vista (incluso después de editar o desactivar)
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.adminUsuarioService.listarUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => {
        console.error('Error al obtener usuarios', err);
      }
    });
  }

  verPerfil(user: Usuario) {
    this.navCtrl.navigateForward('/perfil-usuario', {
      state: { usuario: user }
    });
  }

  irACrearUsuario() {
    this.navCtrl.navigateForward('/admin-usuario-crear');
  }
}
