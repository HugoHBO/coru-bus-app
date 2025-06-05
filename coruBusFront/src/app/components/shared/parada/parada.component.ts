import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParadasService } from '../../../services/Paradas.service';
import { Parada, ParadaInfo } from '../../../models/paradas';
import { FavoritosService } from '../../../services/Favoritos.service';
import { AnalyticsService } from '../../../services/Analytics.service';

@Component({
  selector: 'app-parada',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parada.component.html',
  styleUrl: './parada.component.scss',
})
export class ParadaComponent {
  @Input() parada!: Parada;

  public paradaInfo!: ParadaInfo;
  public esFavorito: boolean = false;
  public modalAbierto = false;

  // Para expandir una línea del modal
  public lineaExpandidaIndex: number | null = null;

  constructor(
    private _paradasService: ParadasService,
    private _favoritoService: FavoritosService,
    private _analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this._favoritoService.favoritos$.subscribe(() => {
      this.esFavorito = this._favoritoService.esFavorito(this.parada.id);
    });
  }

  //#region Favoritos
  public toggleFavorito(parada: Parada): void {
    if (this.esFavorito) {
      this._favoritoService.eliminarFavorito(parada.id);
    } else {
      this._favoritoService.addFavorito(parada);
    }
  }
  //#endregion

  //#region Maps
  public abrirEnGoogleMaps() {
    const lat = this.parada.posy;
    const lng = this.parada.posx;
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
  }
  //#endregion

  public getCodigoLinea(idLinea: number): string | null {
    return this._paradasService.getCodigoLinea(idLinea);
  }

  public getColorLineaById(idLinea: number): string {
    const color = this._paradasService.getColorLineaById(idLinea);
    return color || '';
  }

  public abrirModalParada(idParada: number) {
    this._paradasService.getDatosPadada(idParada).subscribe({
      next: (data) => {
        this.paradaInfo = data;
        this.modalAbierto = true;
        this.lineaExpandidaIndex = null; // resetea al abrir modal
        this._analyticsService.incrementParadaCount(idParada);
      },
      error: (err) => console.error('Error al obtener parada:', err),
    });
  }

  public cerrarModal() {
    this.modalAbierto = false;
  }

  public getNombreParadaById(idParada: number): string {
    const response: Parada | null =
      this._paradasService.getParadaById(idParada);
    return response ? response.nombre : '';
  }

  public toggleLinea(index: number): void {
    this.lineaExpandidaIndex =
      this.lineaExpandidaIndex === index ? null : index;
  }

  public isLineaExpandida(index: number): boolean {
    return this.lineaExpandidaIndex === index;
  }
}
