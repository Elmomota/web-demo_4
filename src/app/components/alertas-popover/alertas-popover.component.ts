import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-alertas-popover',
  templateUrl: './alertas-popover.component.html',
  styleUrls: ['./alertas-popover.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]

})
export class AlertasPopoverComponent {
  @Input() tipo: 'vencidas' | 'stock' = 'vencidas';
  @Input() piezas: any[] = [];

  constructor(private popoverCtrl: PopoverController) {}

  cerrar() {
    this.popoverCtrl.dismiss();
  }
}
