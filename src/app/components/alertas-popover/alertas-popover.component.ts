import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-alertas-popover',
  template: `
    <ion-list *ngIf="tipo === 'vencidas'">
      <ion-item *ngFor="let p of piezas">
        <ion-label>
          <h3>{{ p.nombre }}</h3>
          <p>Venció: {{ p.fecha_vencimiento | date }}</p>
        </ion-label>
      </ion-item>
    </ion-list>

    <ion-list *ngIf="tipo === 'stock'">
      <ion-item *ngFor="let p of piezas">
        <ion-label>
          <h3>{{ p.nombre }}</h3>
          <p>Stock actual: {{ p.cantidad }} / mínimo: {{ p.stock_minimo }}</p>
        </ion-label>
      </ion-item>
    </ion-list>
  `,
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class AlertasPopoverComponent {
  @Input() piezas: any[] = [];
  @Input() tipo: 'vencidas' | 'stock' = 'vencidas';

  constructor(private popoverCtrl: PopoverController) {}
}
