import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarStockPage } from './modificar-stock.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarStockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarStockPageRoutingModule {}
