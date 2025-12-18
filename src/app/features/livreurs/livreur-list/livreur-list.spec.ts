import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LivreurListComponent } from './livreur-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('LivreurListComponent', () => {
  let component: LivreurListComponent;
  let fixture: ComponentFixture<LivreurListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivreurListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LivreurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});