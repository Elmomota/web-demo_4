import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddKitDetailPage } from './add-kit-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AddKitDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddKitDetailPageRoutingModule {}
