import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioExtendido } from 'src/app/models/usuario-extendido';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
  standalone : false
})
export class PerfilUsuarioPage implements OnInit {
  usuario: UsuarioExtendido | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['usuario']) {
        this.usuario = JSON.parse(params['usuario']);
      }
    });
  }
  jsonStringify(obj: any): string {
    return JSON.stringify(obj);
  }
}