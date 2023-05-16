import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHabilidadComponent } from './list-habilidad.component';

describe('ListHabilidadComponent', () => {
  let component: ListHabilidadComponent;
  let fixture: ComponentFixture<ListHabilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHabilidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
