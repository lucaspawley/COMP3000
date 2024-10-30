import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListsPageComponent } from './shopping-lists-page.component';

describe('ShoppingListsPageComponent', () => {
  let component: ShoppingListsPageComponent;
  let fixture: ComponentFixture<ShoppingListsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingListsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingListsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
