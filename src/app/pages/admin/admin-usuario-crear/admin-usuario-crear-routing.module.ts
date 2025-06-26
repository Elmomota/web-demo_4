import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminUsuarioCrearPage } from './admin-usuario-crear.page';

const routes: Routes = [
  {
    path: '',
    component: AdminUsuarioCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminUsuarioCrearPageRoutingModule {}
