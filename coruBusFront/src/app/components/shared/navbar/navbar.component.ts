import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdiomaService } from '../../../services/Idioma.service';
import { TraduccionService } from '../../../services/Traduccion.service';
import { Observable } from 'rxjs';

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
  public idioma!: string;
  public traducciones$!: Observable<Record<string, string>>;

  constructor(
    private _router: Router,
    private _IdiomaService: IdiomaService,
    private eRef: ElementRef,
    private _traduccionService: TraduccionService
  ) {}

  public ngOnInit(): void {
    this.idioma = this._IdiomaService.getIdiomaActual();
    this.actualizarHora();
    const ahora = new Date();
    const msHastaSiguienteMinuto = (60 - ahora.getSeconds()) * 1000;

    setTimeout(() => {
      this.actualizarHora();
      this.intervalo = setInterval(() => this.actualizarHora(), 60000);
    }, msHastaSiguienteMinuto);

    this.traducciones$ = this._traduccionService.traducciones$;
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
    this.idioma = nuevoIdioma;
    this._IdiomaService.selectLanguage(nuevoIdioma);
  }

  public irAEstadisticas() {
    this.menuAbierto = false;
    this._router.navigate(['/estadisticas']);
  }

  public togglePanel() {
    this.panelAbierto = !this.panelAbierto;
  }

  // cierra el panel si clic fuera
  @HostListener('document:click', ['$event'])
  public onClickFuera(event: MouseEvent) {
    const clickedInside = this.eRef.nativeElement.contains(event.target);
    if (!clickedInside && this.panelAbierto) {
      this.panelAbierto = false;
    }
  }
}
