import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LivreurFormComponent } from './livreur-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('LivreurFormComponent', () => {
  let component: LivreurFormComponent;
  let fixture: ComponentFixture<LivreurFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivreurFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LivreurFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});