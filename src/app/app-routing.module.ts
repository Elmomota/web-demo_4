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
  {
    path: 'list-bodega',
    loadChildren: () => import('./admin/list-bodega/list-bodega.module').then( m => m.ListBodegaPageModule)
  },
  {
    path: 'edit-bodega',
    loadChildren: () => import('./admin/edit-bodega/edit-bodega.module').then( m => m.EditBodegaPageModule)
  },
  {
    path: 'view-bodega',
    loadChildren: () => import('./admin/view-bodega/view-bodega.module').then( m => m.ViewBodegaPageModule)
  },
  {
    path: 'view-pieza',
    loadChildren: () => import('./admin/view-pieza/view-pieza.module').then( m => m.ViewPiezaPageModule)
  },
  {
    path: 'list-piezas',
    loadChildren: () => import('./admin/list-piezas/list-piezas.module').then( m => m.ListPiezasPageModule)
  },
  {
    path: 'edit-pieza',
    loadChildren: () => import('./admin/edit-pieza/edit-pieza.module').then( m => m.EditPiezaPageModule)
  },
  {
    path: 'add-pieza',
    loadChildren: () => import('./admin/add-pieza/add-pieza.module').then( m => m.AddPiezaPageModule)
  },
  {
    path: 'add-bodega',
    loadChildren: () => import('./admin/add-bodega/add-bodega.module').then( m => m.AddBodegaPageModule)
  },
  {
    path: 'add-kit',
    loadChildren: () => import('./admin/add-kit/add-kit.module').then( m => m.AddKitPageModule)
  },
  {
    path: 'edit-kit',
    loadChildren: () => import('./admin/edit-kit/edit-kit.module').then( m => m.EditKitPageModule)
  },
  {
    path: 'list-kits',
    loadChildren: () => import('./admin/list-kits/list-kits.module').then( m => m.ListKitsPageModule)
  },
  {
    path: 'view-kit',
    loadChildren: () => import('./admin/view-kit/view-kit.module').then( m => m.ViewKitPageModule)
  },
  {
    path: 'list-kit-details',
    loadChildren: () => import('./admin/list-kit-details/list-kit-details.module').then( m => m.ListKitDetailsPageModule)
  },
  {
    path: 'editt-kit-details',
    loadChildren: () => import('./admin/editt-kit-details/editt-kit-details.module').then( m => m.EdittKitDetailsPageModule)
  },
  {
    path: 'add-kit-detail',
    loadChildren: () => import('./admin/add-kit-detail/add-kit-detail.module').then( m => m.AddKitDetailPageModule)
  },
  {
    path: 'admin-usuario-crear',
    loadChildren: () => import('./pages/admin/admin-usuario-crear/admin-usuario-crear.module').then( m => m.AdminUsuarioCrearPageModule)
  },
  {
    path: 'bodeguero-home',
    loadChildren: () => import('./pages/bodegero/bodeguero-home/bodeguero-home.module').then( m => m.BodegueroHomePageModule)
  },
  {
    path: 'listar-inventario',
    loadChildren: () => import('./pages/bodegero/listar-inventario/listar-inventario.module').then( m => m.ListarInventarioPageModule)
  },
  {
    path: 'modificar-stock',
    loadChildren: () => import('./pages/bodegero/modificar-stock/modificar-stock.module').then( m => m.ModificarStockPageModule)
  },
  {
    path: 'movimientos',
    loadChildren: () => import('./pages/bodegero/movimientos/movimientos.module').then( m => m.MovimientosPageModule)
  },
  {
    path: 'detalle-proyecto/:id',
    loadChildren: () => import('./pages/admin/proyectos/detalle-proyecto/detalle-proyecto.module').then( m => m.DetalleProyectoPageModule)
  },
  {
    path: 'proyectos',
    loadChildren: () => import('./pages/admin/proyectos/proyectos/proyectos.module').then( m => m.ProyectosPageModule)
  },
  {
    path: 'crear-proyecto',
    loadChildren: () => import('./pages/admin/proyectos/crear-proyecto/crear-proyecto.module').then( m => m.CrearProyectoPageModule)
  },

  

  




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
