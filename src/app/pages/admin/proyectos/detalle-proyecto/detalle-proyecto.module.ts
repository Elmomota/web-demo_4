import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleProyectoPageRoutingModule } from './detalle-proyecto-routing.module';

import { DetalleProyectoPage } from './detalle-proyecto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleProyectoPageRoutingModule
  ],
  declarations: [DetalleProyectoPage]
})
export class DetalleProyectoPageModule {}
