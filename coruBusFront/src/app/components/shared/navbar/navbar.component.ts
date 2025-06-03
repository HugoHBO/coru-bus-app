import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  public menuAbierto = false;
  public horaActual: string = '';
  panelAbierto = false;
  private intervalo!: any;
  idioma: 'gal' | 'es' | 'en' = 'es';

  constructor(private _router: Router) {}

  public ngOnInit(): void {
    this.actualizarHora();
    const ahora = new Date();
    const msHastaSiguienteMinuto = (60 - ahora.getSeconds()) * 1000;

    setTimeout(() => {
      this.actualizarHora();
      this.intervalo = setInterval(() => this.actualizarHora(), 60000);
    }, msHastaSiguienteMinuto);
  }

  public actualizarHora(): void {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    this.horaActual = ` ${horas} : ${minutos}`;
  }

  public irAFavoritos() {
    this._router.navigate([]);
  }

  public irALineas() {
    this._router.navigate(['/']);
  }

  public cambiarIdioma(nuevoIdioma: 'gal' | 'es' | 'en') {
    this.idioma = nuevoIdioma;
    // Aquí puedes guardar en localStorage, o llamar a un servicio de traducción si usas ngx-translate
  }

  public irAEstadisticas() {
    this.menuAbierto = false;
    this._router.navigate(['/estadisticas']);
  }

  public togglePanel() {
    this.panelAbierto = !this.panelAbierto;
  }
}
