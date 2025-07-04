/*src\app\services\comboboxes.service.ts**/
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ComboboxesService {
  private baseUrl = `${environment.apiUrl}/api/combobox`;

  constructor(private http: HttpClient) {}

  getTiposUsuario(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tipos-usuario`);
  }

  getRegiones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/regiones`);
  }

  getComunas(region_id: number): Observable<any[]> {
    const params = new HttpParams().set('region_id', region_id.toString());
    return this.http.get<any[]>(`${this.baseUrl}/comunas`, { params });
  }

  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categorias`);
  }

  getMarcas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/marcas`);
  }

  getTiposMovimiento(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/movimientos`);
  }

  getEstadosProyecto(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/estados-proyecto`);
  }

getRolesProyecto(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/roles-proyecto`);
}


  getAlmacenes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/almacenes`);
  }

  getPiezas(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/piezas`);
}

getKits(): Observable<any[]> {
  return this.http.get<any[]>(`${environment.apiUrl}/api/gestion_piezas/kits`);
}

getKitPiezas(idKit: number): Observable<any[]> {
  return this.http.get<any[]>(`${environment.apiUrl}/api/gestion_piezas/kit_piezas/${idKit}`);
}

getUsuarios(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/usuarios`);
}

getProyectos(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/proyectos`);
}



}

