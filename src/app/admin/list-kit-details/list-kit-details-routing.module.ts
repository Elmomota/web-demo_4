import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListKitDetailsPage } from './list-kit-details.page';

const routes: Routes = [
  {
    path: '',
    component: ListKitDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListKitDetailsPageRoutingModule {}
