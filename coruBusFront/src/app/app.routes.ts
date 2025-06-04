import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ParadasComponent } from './components/paradas/paradas.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta raíz ('/')
  { path: 'paradas', component: ParadasComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
];
