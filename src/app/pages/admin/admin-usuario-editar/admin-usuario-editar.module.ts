import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { AdminUsuarioEditarPageRoutingModule } from './admin-usuario-editar-routing.module';

import { AdminUsuarioEditarPage } from './admin-usuario-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AdminUsuarioEditarPageRoutingModule
  ],
  declarations: [AdminUsuarioEditarPage]
})
export class AdminUsuarioEditarPageModule {}
