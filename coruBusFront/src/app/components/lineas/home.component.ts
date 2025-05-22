import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LineasService } from '../../services/lineas.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  data: any;

  constructor(
    private http: HttpClient,
    private _lineasService: LineasService,
    private router: Router
  ) {}

  public irAParadas(linea: any): void {
    this._lineasService.setLinea(linea); // Guarda en memoria y localStorage
    this.router.navigate(['/paradas']);
  }

  // Hace la peticcion al endpoint y recupera el objeto de las lineas
  ngOnInit(): void {
    const datosGuardados = localStorage.getItem('lineasData');
    if (!datosGuardados) {
      this.http.get('/api/getLineas').subscribe({
        next: (respuesta) => {
          this.data = respuesta;
          localStorage.setItem('lineasData', JSON.stringify(respuesta));
        },
        error: (error) => {
          console.error('Error en la petición:', error);
        },
      });
    } else {
      this.data = JSON.parse(datosGuardados);
    }
  }
}
