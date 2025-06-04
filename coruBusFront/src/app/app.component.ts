import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from './services/Data.service';
import { forkJoin, Subscription } from 'rxjs';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AnalyticsService } from './services/Analytics.service';
import { IdiomaService } from './services/Idioma.service';
import { FooterComponent } from './components/shared/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'coruBusFront';
  cargando: boolean = true;
  private idiomaSub!: Subscription;

  private beforeUnloadHandler = () => {
    this._AnalyticsService.postParadasCounter();
  };

  constructor(
    private _DataSevice: DataService,
    private _AnalyticsService: AnalyticsService,
    private _IdiomaService: IdiomaService
  ) {}

  ngOnInit(): void {
    this._AnalyticsService.getTopParadas();

    window.addEventListener('beforeunload', this.beforeUnloadHandler);

    this.idiomaSub = this._IdiomaService.idioma$.subscribe(() => {
      this.cargando = true;

      forkJoin([
        this._DataSevice.chargeLineas(),
        this._DataSevice.chargeParadas(),
      ]).subscribe(() => {
        this.cargando = false;
      });
    });
  }

  ngOnDestroy(): void {
    this.idiomaSub.unsubscribe();
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }
}
