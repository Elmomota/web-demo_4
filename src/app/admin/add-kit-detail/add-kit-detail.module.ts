import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddKitDetailPageRoutingModule } from './add-kit-detail-routing.module';

import { AddKitDetailPage } from './add-kit-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddKitDetailPageRoutingModule
  ],
  declarations: [AddKitDetailPage]
})
export class AddKitDetailPageModule {}
