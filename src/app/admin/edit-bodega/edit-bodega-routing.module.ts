import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditBodegaPage } from './edit-bodega.page';

const routes: Routes = [
  {
    path: '',
    component: EditBodegaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBodegaPageRoutingModule {}
