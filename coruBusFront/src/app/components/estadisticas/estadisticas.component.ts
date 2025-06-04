import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../services/Analytics.service';
import { TopParada, TopParadas } from '../../models/Analytics';
import { ParadasService } from '../../services/Paradas.service';
import { Parada } from '../../models/paradas';
import { Observable } from 'rxjs';
import { TraduccionService } from '../../services/Traduccion.service';

@Component({
  selector: 'app-estadisticas',
  imports: [CommonModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.scss',
})
export class EstadisticasComponent implements OnInit {
  public topParadas! : TopParadas | null ;
  public traducciones$!: Observable<Record<string, string>>;

  constructor(
    private _AnalyticService: AnalyticsService,
    private _ParadasService: ParadasService,
    private _TraduccionService: TraduccionService
  ) {}
  
  ngOnInit(): void {
    this.topParadas = this._AnalyticService.topParadas();
    this.traducciones$ = this._TraduccionService.traducciones$;
  }
  
  public getNombreParadaById(idParada: number) : string {
     const response: Parada | null =
      this._ParadasService.getParadaById(idParada);
    if (!response) {
      return '';
    }
    return response.nombre;
  }
}
