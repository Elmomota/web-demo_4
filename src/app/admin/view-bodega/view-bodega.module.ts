import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewBodegaPageRoutingModule } from './view-bodega-routing.module';

import { ViewBodegaPage } from './view-bodega.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewBodegaPageRoutingModule
  ],
  declarations: [ViewBodegaPage]
})
export class ViewBodegaPageModule {}
