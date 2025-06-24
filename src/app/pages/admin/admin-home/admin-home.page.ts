import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
  standalone : false
})
export class AdminHomePage implements OnInit {
  usuario: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['usuario']) {
        this.usuario = JSON.parse(params['usuario']);
      }
    });
  }

  logout() {
    this.storageService.eliminarSesion().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
