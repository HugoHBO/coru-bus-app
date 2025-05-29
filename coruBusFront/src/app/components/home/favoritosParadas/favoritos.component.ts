import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ParadaComponent } from '../../shared/parada/parada.component';
import { FavoritosService } from '../../../services/Favoritos.service';
import { Parada } from '../../../models/paradas';

@Component({
  selector: 'app-favoritos',
  imports: [CommonModule, ParadaComponent],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss',
})
export class FavoritosComponent implements OnInit {
  public favoritos: Parada[] = [];
  public mostrarFavoritos: boolean = false;

  constructor(private _favoritosService: FavoritosService) {}

  ngOnInit(): void {
    this._favoritosService.favoritos$.subscribe((favoritos) => {
      this.favoritos = favoritos;
    });
  }
}
