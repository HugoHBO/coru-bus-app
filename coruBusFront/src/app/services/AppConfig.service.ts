import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  /** detecta si estás en localhost o en producción */
  async loadConfig(): Promise<void> {
    const env = location.hostname === 'localhost' ? 'dev' : 'prod';
    const path = `assets/config.${env}.json`;
    this.config = await firstValueFrom(this.http.get(path));
  }

  /** carga el json correspondiente */
  get apiUrl(): string {
    return this.config?.apiUrl ?? '';
  }
}
