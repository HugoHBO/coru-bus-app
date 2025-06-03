import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  idioma: any;
  cambiarIdioma(arg0: string) {
    throw new Error('Method not implemented.');
  }
  panelAbierto: any;
  togglePanel() {
    throw new Error('Method not implemented.');
  }
  public menuAbierto = false;
  horaActual: string = '';
  private router = inject(Router);

  constructor() {
    this.actualizarHora();
    setInterval(() => this.actualizarHora(), 1000);
  }

  public toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  public irALineas() {
    this.menuAbierto = false;
    this.router.navigate(['/lineas']);
  }

  public irAEstadisticas() {
    this.menuAbierto = false;
    this.router.navigate(['/estadisticas']);
  }

  private actualizarHora() {
    const ahora = new Date();
    this.horaActual = ahora.toLocaleTimeString();
  }
}
