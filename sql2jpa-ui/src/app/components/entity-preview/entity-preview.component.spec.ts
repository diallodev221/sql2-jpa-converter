import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityPreviewComponent } from './entity-preview.component';

describe('EntityPreviewComponent', () => {
  let component: EntityPreviewComponent;
  let fixture: ComponentFixture<EntityPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
