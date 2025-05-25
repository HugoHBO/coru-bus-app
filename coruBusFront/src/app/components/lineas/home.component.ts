import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ParadasService } from '../../services/Paradas.service';


@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  lineas: any 

  constructor(
    private _lineasService: ParadasService,
    private router: Router
  ) {}

  public irAParadas(linea: any): void {
    this._lineasService.setSelectedLinea(linea); 
    this.router.navigate(['/paradas']);
  }

  // Hace la peticcion al endpoint y recupera el objeto de las lineas
  ngOnInit(): void {
  this.lineas = JSON.parse(sessionStorage.getItem('lineasData') || '[]');
  }
  
}
