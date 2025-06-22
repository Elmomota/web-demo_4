import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewKitPage } from './view-kit.page';

const routes: Routes = [
  {
    path: '',
    component: ViewKitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewKitPageRoutingModule {}
