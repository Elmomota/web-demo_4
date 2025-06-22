import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPiezaPageRoutingModule } from './add-pieza-routing.module';

import { AddPiezaPage } from './add-pieza.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPiezaPageRoutingModule
  ],
  declarations: [AddPiezaPage]
})
export class AddPiezaPageModule {}
