import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

// Mock para el IdiomaService
const idiomaServiceMock = {
  getIdiomaActual: () => 'es',
  selectLanguage: (lang: string) => {},
};

// Mock para el TraduccionService con traducciones dummy
const traduccionServiceMock = {
  traducciones$: of({
    'nav.idioma': 'Idioma',
    'nav.estadistica': 'Estadísticas',
  }),
};

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavbarComponent],
      providers: [
        { provide: 'IdiomaService', useValue: idiomaServiceMock },
        { provide: 'TraduccionService', useValue: traduccionServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;

    // Reemplaza las inyecciones para que apunten a los mocks
    (component as any)._IdiomaService = idiomaServiceMock;
    (component as any)._traduccionService = traduccionServiceMock;

    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir traducciones', (done) => {
    component.traducciones$.subscribe((traducciones) => {
      expect(traducciones['nav.idioma']).toBe('Idioma');
      done();
    });
  });
});
