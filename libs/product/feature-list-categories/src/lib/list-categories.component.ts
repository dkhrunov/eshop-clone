import { Component } from '@angular/core';
import { ListCategoriesFacade } from '@esc/product/domain';

@Component({
  selector: 'product-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.less'],
})
export class ListCategoriesComponent {
  allCategories$ = this.listCategoriesFacade.allCategories$;

  constructor(private listCategoriesFacade: ListCategoriesFacade) {}
}
