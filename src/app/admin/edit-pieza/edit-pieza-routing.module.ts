import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPiezaPage } from './edit-pieza.page';

const routes: Routes = [
  {
    path: '',
    component: EditPiezaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPiezaPageRoutingModule {}
