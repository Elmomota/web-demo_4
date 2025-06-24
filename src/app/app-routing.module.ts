import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recuperar-cuenta',
    loadChildren: () => import('./pages/recuperar-cuenta/recuperar-cuenta.module').then( m => m.RecuperarCuentaPageModule)
  },
  {
    path: 'verificar-codigo',
    loadChildren: () => import('./pages/verificar-codigo/verificar-codigo.module').then( m => m.VerificarCodigoPageModule)
  },
  {
    path: 'nueva-contrasena',
    loadChildren: () => import('./pages/nueva-contrasena/nueva-contrasena.module').then( m => m.NuevaContrasenaPageModule)
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./pages/admin/admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardPageModule)
  },
  {
    path: 'admin-home',
    loadChildren: () => import('./pages/admin/admin-home/admin-home.module').then( m => m.AdminHomePageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./pages/admin/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'perfil-usuario',
    loadChildren: () => import('./pages/admin/perfil-usuario/perfil-usuario.module').then( m => m.PerfilUsuarioPageModule)
  },
  {
    path: 'admin-usuario-editar',
    loadChildren: () => import('./pages/admin/admin-usuario-editar/admin-usuario-editar.module').then( m => m.AdminUsuarioEditarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
