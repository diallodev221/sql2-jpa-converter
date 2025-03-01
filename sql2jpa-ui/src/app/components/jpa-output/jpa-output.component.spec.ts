import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JpaOutputComponent } from './jpa-output.component';

describe('JpaOutputComponent', () => {
  let component: JpaOutputComponent;
  let fixture: ComponentFixture<JpaOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JpaOutputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JpaOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
