import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBodegaPage } from './add-bodega.page';

const routes: Routes = [
  {
    path: '',
    component: AddBodegaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBodegaPageRoutingModule {}
