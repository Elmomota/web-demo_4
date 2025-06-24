import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminUsuarioEditarPage } from './admin-usuario-editar.page';

const routes: Routes = [
  {
    path: '',
    component: AdminUsuarioEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminUsuarioEditarPageRoutingModule {}
