// src/app/pages/usuarios/usuarios.page.ts
import { Component, OnInit } from '@angular/core';
import { AdminUsuarioService } from 'src/app/services/admin-usuario.service';
import { UsuarioExtendido } from 'src/app/models/usuario-extendido';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  standalone: false
})
export class UsuariosPage implements OnInit {
  usuarios: UsuarioExtendido[] = [];

  constructor(
     private navCtrl: NavController,
    private adminUsuarioService: AdminUsuarioService
  ) {}

  ngOnInit() {
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
  verPerfil(user: UsuarioExtendido) {
  this.navCtrl.navigateForward('/perfil-usuario', {
    queryParams: { usuario: JSON.stringify(user) }
  });
}
}
