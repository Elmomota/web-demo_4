import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListBodegaPageRoutingModule } from './list-bodega-routing.module';

import { ListBodegaPage } from './list-bodega.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListBodegaPageRoutingModule
  ],
  declarations: [ListBodegaPage]
})
export class ListBodegaPageModule {}
