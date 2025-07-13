import { TestBed } from '@angular/core/testing';
import { CategoriaService } from './categoria.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CategoriaService', () => {
  let service: CategoriaService;
  let HttpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoriaService]
    });
    service = TestBed.inject(CategoriaService);
    HttpMock = TestBed.inject(HttpTestingController);
    
  });

  afterEach(() => {
    HttpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería realizar una petición HTTP GET a la URL correcta', () => {
  service.getCategorias().subscribe();
  const req = HttpMock.expectOne('https://briamcarrasco.github.io/json-api_cutsframe/categoria.json');
  expect(req.request.method).toBe('GET');
  expect(req.request.url).toBe('https://briamcarrasco.github.io/json-api_cutsframe/categoria.json');
  req.flush([]);
  });

  it('debería obtener las categorías desde la respuesta de la API', () => {
    const mockCategorias = [
      { id: 1, nombre: 'Deportes', descripcion: 'Cámaras deportivas' },
      { id: 2, nombre: 'Profesional', descripcion: 'Cámaras profesionales' }
    ];

    service.getCategorias().subscribe(categorias => {
      expect(categorias).toEqual(mockCategorias);
      expect(categorias.length).toBe(2);
    });

    const req = HttpMock.expectOne('https://briamcarrasco.github.io/json-api_cutsframe/categoria.json');
    req.flush(mockCategorias);
  });

    it('debería emitir un error cuando la petición HTTP falla', () => {
    service.getCategorias().subscribe({
      next: () => fail('Expected error'),
      error: (error) => {
        expect(error.status).toBe(404);
      }
    });

    const req = HttpMock.expectOne(service['jsonURl']);
    req.flush('Error', { status: 404, statusText: 'Not Found' });
  });
});
