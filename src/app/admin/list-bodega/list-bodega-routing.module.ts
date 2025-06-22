import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListBodegaPage } from './list-bodega.page';

const routes: Routes = [
  {
    path: '',
    component: ListBodegaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListBodegaPageRoutingModule {}
