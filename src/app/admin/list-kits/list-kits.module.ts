import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListKitsPageRoutingModule } from './list-kits-routing.module';

import { ListKitsPage } from './list-kits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListKitsPageRoutingModule
  ],
  declarations: [ListKitsPage]
})
export class ListKitsPageModule {}
