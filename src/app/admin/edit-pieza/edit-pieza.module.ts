import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPiezaPageRoutingModule } from './edit-pieza-routing.module';

import { EditPiezaPage } from './edit-pieza.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPiezaPageRoutingModule
  ],
  declarations: [EditPiezaPage]
})
export class EditPiezaPageModule {}
