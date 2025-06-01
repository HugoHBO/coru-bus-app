import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParadasService } from '../../../services/Paradas.service';
import { Parada, ParadaInfo } from '../../../models/paradas';
import { ParadaModalComponent } from '../parada-modal/parada-modal.component';
import { FavoritosService } from '../../../services/Favoritos.service';

@Component({
  selector: 'app-parada',
  imports: [CommonModule, ParadaModalComponent],
  templateUrl: './parada.component.html',
  styleUrl: './parada.component.scss',
})
export class ParadaComponent {
  @Input() parada!: Parada;
  public nombreLinea!: string;
  public paradaInfo!: ParadaInfo;
  public favoritos: Parada[] = [];
  esFavorito: boolean = false;

  constructor(
    private _paradasService: ParadasService,
    private _favoritoService: FavoritosService
  ) {}

  ngOnInit() {
    this._favoritoService.favoritos$.subscribe((favoritos) => {
      this.esFavorito = this._favoritoService.esFavorito(this.parada.id);
    });
  }

  @ViewChild(ParadaModalComponent) modal!: ParadaModalComponent;

  //#region Favoritos ----------------

  public toggleFavorito(parada: Parada): void {
    if (this.esFavorito) {
      this._favoritoService.eliminarFavorito(parada.id);
    } else {
      this._favoritoService.addFavorito(parada);
    }
  }

  //#endregion -----------------------
  
  //#region Maps ---------------------

  public abrirEnGoogleMaps() {
  const lat = this.parada.posy;
  const lng = this.parada.posx;
  const url = `https://www.google.com/maps?q=${lat},${lng}`;
  window.open(url, '_blank'); 
}
  //#endregion ----------------------

  public getCodigoLinea(idLinea: number): string | null {
    return this._paradasService.getCodigoLinea(idLinea);
  }

  public getColorLineaById(idLinea: number): string {
    const color = this._paradasService.getColorLineaById(idLinea);
    if (!color) {
      return '';
    }
    return color;
  }

  public abrirModalParada(idParada: number) {
    // carga los datos de la parada seleccionada en paradaInfo
    this.getDatosParada(idParada);
  }

  private getDatosParada(idParada: number): void {
    this._paradasService.getDatosPadada(idParada).subscribe({
      next: (data) => {
        this.paradaInfo = data;
        if (this.modal) {
          this.modal.abrirModal();
        }
      },
      error: (err) => console.error('Error al obtener parada:', err),
    });
  }
}
