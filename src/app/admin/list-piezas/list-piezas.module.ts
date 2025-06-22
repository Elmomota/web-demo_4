import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPiezasPageRoutingModule } from './list-piezas-routing.module';

import { ListPiezasPage } from './list-piezas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPiezasPageRoutingModule
  ],
  declarations: [ListPiezasPage]
})
export class ListPiezasPageModule {}
