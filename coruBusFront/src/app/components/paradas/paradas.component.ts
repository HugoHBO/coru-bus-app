import { Component, ViewChild, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParadasService } from '../../services/Paradas.service';
import { Linea } from '../../models/linea';
import { Parada, ParadaInfo } from '../../models/paradas';
import { ParadaModalComponent } from '../shared/parada-modal/parada-modal.component';
import { ParadaComponent } from "../shared/parada/parada.component";

@Component({
  selector: 'app-paradas',
  imports: [CommonModule, ParadaModalComponent, ParadaComponent],
  templateUrl: './paradas.component.html',
  styleUrl: './paradas.component.scss',
})
export class ParadasComponent implements OnInit {
  public ruta: string = 'ida';
  public selectedLinea!: Linea;
  public selectedParada!: ParadaInfo;
  public paradaInfo!: ParadaInfo; 
  public linComer: string = '';
  public paradasIda: Parada[] | null = [];
  public paradasVuelta: Parada[] | null = [];
  
  constructor(private _paradasService: ParadasService) {}

  @ViewChild(ParadaModalComponent) modal!: ParadaModalComponent;

  public getCodigoLinea(enlace : number): string | null {
    return this._paradasService.getCodigoLinea(enlace);
  }  

  public abrirModalParada(idParada:number) {
    // carga los datos de la parada seleccionada en paradaInfo
    this.getDatosParada(idParada);
  }
  
  public getDatosParada(idParada :number): void {
    this._paradasService.getDatosPadada(idParada).subscribe({
      next: (data) =>  {
      this.paradaInfo = data;
      if (this.modal) {
        this.modal.abrirModal();
      }},
      error: (err) => console.error('Error al obtener parada:' , err)
    });
  }

  ngOnInit(): void {
    this.selectedLinea = this._paradasService.getSelectedLinea();
    this.paradasIda = this._paradasService.getParadasIda(this.selectedLinea);
    this.paradasVuelta = this._paradasService.getParadasVuelta(this.selectedLinea);
  }
}
