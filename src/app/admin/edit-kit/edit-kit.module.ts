import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditKitPageRoutingModule } from './edit-kit-routing.module';

import { EditKitPage } from './edit-kit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditKitPageRoutingModule
  ],
  declarations: [EditKitPage]
})
export class EditKitPageModule {}
