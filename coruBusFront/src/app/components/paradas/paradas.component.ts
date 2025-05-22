import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { LineasService } from '../../services/lineas.service';

@Component({
  selector: 'app-paradas',
  imports: [CommonModule],
  templateUrl: './paradas.component.html',
  styleUrl: './paradas.component.scss'
})
export class ParadasComponent {
  // Guarda el objeto linea desde _LienasService
  linea: any;

  // Inyecta el servicio en el constructor
  constructor(private _lineasService: LineasService) {}

  // se ejecuta antes que nada
  ngOnInit(): void {
    this.linea = this._lineasService.getLinea();
  }

}
