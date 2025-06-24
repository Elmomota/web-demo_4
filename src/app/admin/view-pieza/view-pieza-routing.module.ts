import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPiezaPage } from './view-pieza.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPiezaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPiezaPageRoutingModule {}
