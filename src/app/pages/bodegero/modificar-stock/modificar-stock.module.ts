import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarStockPageRoutingModule } from './modificar-stock-routing.module';

import { ModificarStockPage } from './modificar-stock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarStockPageRoutingModule
  ],
  declarations: [ModificarStockPage]
})
export class ModificarStockPageModule {}
