import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarInventarioPage } from './listar-inventario.page';

const routes: Routes = [
  {
    path: '',
    component: ListarInventarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarInventarioPageRoutingModule {}
