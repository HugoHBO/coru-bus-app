import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAppInitializer } from '@angular/core';
import { routes } from './app.routes';
import { AppConfigService } from './services/AppConfig.service';

/** Función para cargar la configuración antes de iniciar la app */
export function initAppConfig() {
  const configService = inject(AppConfigService);
  return configService.loadConfig();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideAppInitializer(initAppConfig),
  ],
};
