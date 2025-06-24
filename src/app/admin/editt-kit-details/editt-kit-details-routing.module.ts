import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdittKitDetailsPage } from './editt-kit-details.page';

const routes: Routes = [
  {
    path: '',
    component: EdittKitDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdittKitDetailsPageRoutingModule {}
