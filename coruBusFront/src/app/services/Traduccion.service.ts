import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IdiomaService } from './Idioma.service';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TraduccionService {
  private traduccionesSubject = new BehaviorSubject<Record<string, string>>({});
  traducciones$ = this.traduccionesSubject.asObservable();

  constructor(private http: HttpClient, private _idiomaService: IdiomaService) {
    this._idiomaService.idioma$
      .pipe(
        switchMap((idioma) =>
          this.http.get<Record<string, string>>(`/assets/i18n/${idioma}.json`)
        )
      )
      .subscribe((data) => this.traduccionesSubject.next(data));
  }
}
