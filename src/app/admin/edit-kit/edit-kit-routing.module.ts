import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditKitPage } from './edit-kit.page';

const routes: Routes = [
  {
    path: '',
    component: EditKitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditKitPageRoutingModule {}
