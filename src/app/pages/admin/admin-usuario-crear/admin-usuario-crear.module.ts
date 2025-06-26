import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // ✅ Aquí lo agregas
import { IonicModule } from '@ionic/angular';

import { AdminUsuarioCrearPageRoutingModule } from './admin-usuario-crear-routing.module';
import { AdminUsuarioCrearPage } from './admin-usuario-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // ✅ IMPORTANTE
    IonicModule,
    AdminUsuarioCrearPageRoutingModule
  ],
  declarations: [AdminUsuarioCrearPage]
})
export class AdminUsuarioCrearPageModule {}
