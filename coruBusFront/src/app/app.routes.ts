import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ParadasComponent } from './components/paradas/paradas.component'; 
 
export const routes: Routes = [

      { path: '', component: HomeComponent },  // Ruta raíz ('/')
      { path: 'paradas', component: ParadasComponent },

];
