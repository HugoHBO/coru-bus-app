import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParadaModalComponent } from './parada-modal.component';

describe('ParadaModalComponent', () => {
  let component: ParadaModalComponent;
  let fixture: ComponentFixture<ParadaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParadaModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParadaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
