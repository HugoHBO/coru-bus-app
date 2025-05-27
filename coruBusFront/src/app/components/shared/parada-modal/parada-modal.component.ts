import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Modal } from 'bootstrap';
import { Parada, ParadaInfo } from '../../../models/paradas';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ParadasService } from '../../../services/Paradas.service';

@Component({
  selector: 'app-parada-modal',
  imports: [CommonModule],
  templateUrl: './parada-modal.component.html',
  styleUrl: './parada-modal.component.scss',
  animations: [
    trigger('expandCollapse', [
      state(
        'collapsed',
        style({
          height: '0',
          opacity: 0,
          overflow: 'hidden',
          padding: '0',
          margin: '0',
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          opacity: 1,
          overflow: 'hidden',
          padding: '*',
          margin: '*',
        })
      ),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
  ],
})
export class ParadaModalComponent {
  @Input() paradaInfo!: ParadaInfo;

  private modalInstance?: Modal;
  public lineaExpandidaIndex: number | null = null;

  constructor(private _paradasService: ParadasService) {}

  public getCodigoLinea(enlace: number): string | null {
    return this._paradasService.getCodigoLinea(enlace);
  }

  public abrirModal(): void {
    const modalEl = document.getElementById('miModal');
    if (modalEl) {
      this.modalInstance = new Modal(modalEl);
      this.modalInstance.show();
    }
  }

  public cerrarModal(): void {
    this.modalInstance?.hide();
  }

  public toggleLinea(index: number): void {
    this.lineaExpandidaIndex =
      this.lineaExpandidaIndex === index ? null : index;
  }

  public isLineaExpandida(index: number): boolean {
    return this.lineaExpandidaIndex === index;
  }

  public getNombreParadaById(idParada: number): string {
    const response: Parada | null =
      this._paradasService.getParadaById(idParada);
    if (!response) {
      return '';
    }
    return response.nombre;
  }
}
