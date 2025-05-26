import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async guardarSesion(usuario: any): Promise<void> {
    await this._storage?.set('usuario', usuario);
  }

  async obtenerSesion(): Promise<any> {
    return await this._storage?.get('usuario');
  }

  async eliminarSesion(): Promise<void> {
    await this._storage?.remove('usuario');
  }
}
