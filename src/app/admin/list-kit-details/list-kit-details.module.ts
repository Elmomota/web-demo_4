import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListKitDetailsPageRoutingModule } from './list-kit-details-routing.module';

import { ListKitDetailsPage } from './list-kit-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListKitDetailsPageRoutingModule
  ],
  declarations: [ListKitDetailsPage]
})
export class ListKitDetailsPageModule {}
