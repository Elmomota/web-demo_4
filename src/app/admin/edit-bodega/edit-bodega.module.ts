import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditBodegaPageRoutingModule } from './edit-bodega-routing.module';

import { EditBodegaPage } from './edit-bodega.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditBodegaPageRoutingModule
  ],
  declarations: [EditBodegaPage]
})
export class EditBodegaPageModule {}
