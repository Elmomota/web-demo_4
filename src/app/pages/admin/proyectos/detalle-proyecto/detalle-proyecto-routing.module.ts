import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleProyectoPage } from './detalle-proyecto.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleProyectoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleProyectoPageRoutingModule {}
