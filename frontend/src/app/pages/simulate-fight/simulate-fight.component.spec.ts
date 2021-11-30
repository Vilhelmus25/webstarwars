import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateFightComponent } from './simulate-fight.component';

describe('SimulateFightComponent', () => {
  let component: SimulateFightComponent;
  let fixture: ComponentFixture<SimulateFightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulateFightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulateFightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
