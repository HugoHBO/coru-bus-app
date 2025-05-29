import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  horaActual: string = '';
  private intervalo!: any;

  constructor(private _router: Router) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

 ngOnInit(): void {
  this.actualizarHora();
  const ahora = new Date();
  const msHastaSiguienteMinuto = (60 - ahora.getSeconds()) * 1000;

  setTimeout(() => {
    this.actualizarHora();
    this.intervalo = setInterval(() => this.actualizarHora(), 60000);
  }, msHastaSiguienteMinuto);
}
  actualizarHora(): void {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    this.horaActual = ` ${horas} : ${minutos}`;
  }

  irAFavoritos() {
    this._router.navigate([]);
  }

  irALineas() {
    this._router.navigate(['/']);
  }
}
