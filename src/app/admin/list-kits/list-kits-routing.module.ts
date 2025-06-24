import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListKitsPage } from './list-kits.page';

const routes: Routes = [
  {
    path: '',
    component: ListKitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListKitsPageRoutingModule {}
