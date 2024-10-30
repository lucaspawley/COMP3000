import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindRecipePageComponent } from './find-recipe-page.component';

describe('FindRecipePageComponent', () => {
  let component: FindRecipePageComponent;
  let fixture: ComponentFixture<FindRecipePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindRecipePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindRecipePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
