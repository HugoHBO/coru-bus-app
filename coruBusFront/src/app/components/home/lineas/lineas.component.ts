import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ParadasService } from '../../../services/Paradas.service';
import { Linea } from '../../../models/linea';

@Component({
  selector: 'app-lineas',
  imports: [CommonModule],
  templateUrl: './lineas.component.html',
  styleUrl: './lineas.component.scss'
})
export class LineasComponent {
  lineas: Linea[] = [];
  
  constructor(
    private _paradasService: ParadasService,
    private router: Router) {}
  
  public irAParadas(linea: any): void {
    this._paradasService.setSelectedLinea(linea); 
    this.router.navigate(['/paradas']);
  }

  ngOnInit(): void {
  this.lineas = JSON.parse(sessionStorage.getItem('lineasData') || '[]');
  }
}
