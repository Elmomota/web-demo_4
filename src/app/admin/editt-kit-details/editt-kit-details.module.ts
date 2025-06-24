import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdittKitDetailsPageRoutingModule } from './editt-kit-details-routing.module';

import { EdittKitDetailsPage } from './editt-kit-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdittKitDetailsPageRoutingModule
  ],
  declarations: [EdittKitDetailsPage]
})
export class EdittKitDetailsPageModule {}
