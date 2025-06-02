import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from './services/Data.service';
import { forkJoin } from 'rxjs';
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { AnalyticsService } from './services/Analytics.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'coruBusFront';
  cargando : boolean = true;

  constructor(
    private _DataSevice : DataService,
    private _AnalyticsService : AnalyticsService
  ){}

  ngOnInit(): void {
  forkJoin([
    this._DataSevice.chargeLineas(),
    this._DataSevice.chargeParadas()
  ]).subscribe(() => {
    this.cargando = false;
  });
}



}
