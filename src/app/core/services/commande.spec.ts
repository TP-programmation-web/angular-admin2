import { TestBed } from '@angular/core/testing';
import { CommandeService } from './commande.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CommandeService', () => {
  let service: CommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CommandeService
      ]
    });
    service = TestBed.inject(CommandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});