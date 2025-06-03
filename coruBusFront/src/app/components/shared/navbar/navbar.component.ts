import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdiomaService } from '../../../services/Idioma.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  public menuAbierto = false;
  public horaActual: string = '';
  public panelAbierto = false;
  private intervalo!: any;
  public idioma! : string;

  constructor(private _router: Router, private _IdiomaService: IdiomaService) {}

  public ngOnInit(): void {
    this.idioma = this._IdiomaService.getIdiomaActual();
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

  public cambiarIdioma(nuevoIdioma: 'gl' | 'es' | 'en') {
    this._IdiomaService.selectLanguage(nuevoIdioma);
  }

  public irAEstadisticas() {
    this.menuAbierto = false;
    this._router.navigate(['/estadisticas']);
  }

  public togglePanel() {
    this.panelAbierto = !this.panelAbierto;
  }

}
