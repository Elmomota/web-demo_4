import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPiezaPage } from './add-pieza.page';

const routes: Routes = [
  {
    path: '',
    component: AddPiezaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPiezaPageRoutingModule {}
