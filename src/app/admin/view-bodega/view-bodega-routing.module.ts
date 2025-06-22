import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewBodegaPage } from './view-bodega.page';

const routes: Routes = [
  {
    path: '',
    component: ViewBodegaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewBodegaPageRoutingModule {}
