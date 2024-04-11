import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShimmerUiComponent } from './shimmer-ui.component';

describe('ShimmerUiComponent', () => {
  let component: ShimmerUiComponent;
  let fixture: ComponentFixture<ShimmerUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShimmerUiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShimmerUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
