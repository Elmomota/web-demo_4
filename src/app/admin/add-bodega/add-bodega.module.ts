import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBodegaPageRoutingModule } from './add-bodega-routing.module';

import { AddBodegaPage } from './add-bodega.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBodegaPageRoutingModule
  ],
  declarations: [AddBodegaPage]
})
export class AddBodegaPageModule {}
