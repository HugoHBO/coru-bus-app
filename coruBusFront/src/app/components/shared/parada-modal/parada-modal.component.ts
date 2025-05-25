import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Modal } from 'bootstrap';
import { ParadaInfo } from '../../../models/paradas';

@Component({
  selector: 'app-parada-modal',
  imports: [CommonModule],
  templateUrl: './parada-modal.component.html',
  styleUrl: './parada-modal.component.scss',
})
export class ParadaModalComponent implements OnChanges {
  
  @Input() paradaInfo!: ParadaInfo;

  private modalInstance?: Modal;
  public lineasExpandida: boolean[] = [];

  abrirModal() {
    const modalEl = document.getElementById('miModal');
    if (modalEl) {
      this.modalInstance = new Modal(modalEl);
      this.modalInstance.show();
    }
  }

  cerrarModal() {
    this.modalInstance?.hide();
  }

  toggleLinea(i: number) {
    this.lineasExpandida[i] = !this.lineasExpandida[i];
  }
  ngOnChanges(changes: SimpleChanges): void {
  if (changes['paradaInfo'] && this.paradaInfo?.lineas) {
    this.lineasExpandida = this.paradaInfo.lineas.map(() => false);
  }
}
}
