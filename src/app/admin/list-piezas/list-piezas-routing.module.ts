import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPiezasPage } from './list-piezas.page';

const routes: Routes = [
  {
    path: '',
    component: ListPiezasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPiezasPageRoutingModule {}
