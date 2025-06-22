import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewKitPageRoutingModule } from './view-kit-routing.module';

import { ViewKitPage } from './view-kit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewKitPageRoutingModule
  ],
  declarations: [ViewKitPage]
})
export class ViewKitPageModule {}
