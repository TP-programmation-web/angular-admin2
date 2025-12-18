import { TestBed } from '@angular/core/testing';
import { LivreurService } from './livreur.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('LivreurService', () => {
  let service: LivreurService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(LivreurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});