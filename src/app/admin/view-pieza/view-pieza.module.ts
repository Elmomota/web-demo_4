import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPiezaPageRoutingModule } from './view-pieza-routing.module';

import { ViewPiezaPage } from './view-pieza.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPiezaPageRoutingModule
  ],
  declarations: [ViewPiezaPage]
})
export class ViewPiezaPageModule {}
