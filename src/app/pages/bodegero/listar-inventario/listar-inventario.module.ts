import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarInventarioPageRoutingModule } from './listar-inventario-routing.module';

import { ListarInventarioPage } from './listar-inventario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarInventarioPageRoutingModule
  ],
  declarations: [ListarInventarioPage]
})
export class ListarInventarioPageModule {}
