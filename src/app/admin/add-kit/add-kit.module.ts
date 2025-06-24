import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddKitPageRoutingModule } from './add-kit-routing.module';

import { AddKitPage } from './add-kit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddKitPageRoutingModule
  ],
  declarations: [AddKitPage]
})
export class AddKitPageModule {}
