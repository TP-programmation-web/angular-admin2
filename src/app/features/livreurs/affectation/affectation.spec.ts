import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AffectationComponent } from './affectation.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('AffectationComponent', () => {
  let component: AffectationComponent;
  let fixture: ComponentFixture<AffectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffectationComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});