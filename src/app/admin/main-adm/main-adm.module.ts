import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainAdmPageRoutingModule } from './main-adm-routing.module';

import { MainAdmPage } from './main-adm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainAdmPageRoutingModule
  ],
  declarations: [MainAdmPage]
})
export class MainAdmPageModule {}
