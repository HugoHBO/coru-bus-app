import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParadasService } from '../../../services/Paradas.service';
import { Parada } from '../../../models/paradas';

@Component({
  selector: 'app-parada',
  imports: [CommonModule],
  templateUrl: './parada.component.html',
  styleUrl: './parada.component.scss',
})
export class ParadaComponent {
  @Input() parada!: Parada;
  public nombreLinea! :string; 

  constructor( private _paradasService : ParadasService){} 
  
  public getCodigoLinea(idLinea : number): string | null {
    return this._paradasService.getCodigoLinea(idLinea);
  }  

  public getColorLineaById(idLinea : number) : string {
      const color = this._paradasService.getColorLineaById(idLinea);
      if (!color) {
        return '';
      }
      return color
  }

}
