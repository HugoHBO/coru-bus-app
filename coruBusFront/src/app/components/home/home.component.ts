import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ParadasService } from '../../services/Paradas.service';
import { LineasComponent } from './lineas/lineas.component';
import { FavoritosComponent } from "./favoritosParadas/favoritos.component";


@Component({
  selector: 'app-home',
  imports: [CommonModule, LineasComponent, FavoritosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  lineas: any 
  
  constructor(
    private _paradasService: ParadasService,
    private router: Router
  ) {}

  public irAParadas(linea: any): void {
    this._paradasService.setSelectedLinea(linea); 
    this.router.navigate(['/paradas']);
  }

  // Hace la peticcion al endpoint y recupera el objeto de las lineas
  ngOnInit(): void {
  }
  
}
