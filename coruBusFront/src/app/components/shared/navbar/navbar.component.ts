import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  irAFavoritos() {
    console.log('Navegar a favoritos');
    
  }

  irALineas() {
    console.log('Navegar a líneas');
  }
}
