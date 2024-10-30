import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavRecipePageComponent } from './fav-recipe-page.component';

describe('FavRecipePageComponent', () => {
  let component: FavRecipePageComponent;
  let fixture: ComponentFixture<FavRecipePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavRecipePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavRecipePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
