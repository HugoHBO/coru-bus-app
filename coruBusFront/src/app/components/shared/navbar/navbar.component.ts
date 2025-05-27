import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {

  constructor(private _router: Router) {}

  irAFavoritos() {
    this._router.navigate([])
  }

  irALineas() {
    this._router.navigate(["/"])
  }
}
