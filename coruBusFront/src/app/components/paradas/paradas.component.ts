import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParadasService } from '../../services/Paradas.service';
import { Linea } from '../../models/linea';
import { Parada, ParadaInfo } from '../../models/paradas';
import { ParadaComponent } from '../shared/parada/parada.component';
import { FavoritosService } from '../../services/Favoritos.service';

@Component({
  selector: 'app-paradas',
  imports: [CommonModule, ParadaComponent],
  templateUrl: './paradas.component.html',
  styleUrl: './paradas.component.scss',
})
export class ParadasComponent implements OnInit {
  public ruta: 'ida' | 'vuelta' = 'ida';
  public selectedLinea!: Linea;
  public selectedParada!: ParadaInfo;
  public paradaInfo!: ParadaInfo;
  public linComer: string = '';
  public paradasIda: Parada[] | null = [];
  public paradasVuelta: Parada[] | null = [];
  public favoritos: Parada[] = [];

  constructor(
    private _paradasService: ParadasService,
    private _favoritosService: FavoritosService
  ) {}

  ngOnInit(): void {
    this.selectedLinea = this._paradasService.getSelectedLinea();
    this.paradasIda = this._paradasService.getParadasIda(this.selectedLinea);
    this.paradasVuelta = this._paradasService.getParadasVuelta(
      this.selectedLinea
    );
    this._favoritosService.favoritos$.subscribe((favoritos) => {
      this.favoritos = favoritos;
    });
  }

  public onToggleChange(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (input) {
      this.ruta = input.checked ? 'vuelta' : 'ida';
    }
  }

  public getCodigoLinea(enlace: number): string | null {
    return this._paradasService.getCodigoLinea(enlace);
  }
}
