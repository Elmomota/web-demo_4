import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BodegueroHomePageRoutingModule } from './bodeguero-home-routing.module';

import { BodegueroHomePage } from './bodeguero-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BodegueroHomePageRoutingModule
  ],
  declarations: [BodegueroHomePage]
})
export class BodegueroHomePageModule {}
