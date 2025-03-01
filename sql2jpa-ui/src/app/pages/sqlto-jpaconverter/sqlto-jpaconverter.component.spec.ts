import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqltoJpaconverterComponent } from './sqlto-jpaconverter.component';

describe('SqltoJpaconverterComponent', () => {
  let component: SqltoJpaconverterComponent;
  let fixture: ComponentFixture<SqltoJpaconverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SqltoJpaconverterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SqltoJpaconverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
