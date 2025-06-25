import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-view-kit',
  templateUrl: './view-kit.page.html',
  styleUrls: ['./view-kit.page.scss'],
  standalone: false
})
export class ViewKitPage implements OnInit {
    kit: any;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) {
    this.kit = this.navParams.get('kit');
  }

  ngOnInit() {}

  cerrar() {
    this.modalCtrl.dismiss();
  }
}