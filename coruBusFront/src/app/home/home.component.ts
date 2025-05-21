import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  data: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // comprobar si hay datos en local storage 
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
