import { Component } from '@angular/core';
import { ListCategoriesFacade } from '@esc/product/domain';

@Component({
  selector: 'product-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.less'],
})
export class ListCategoriesComponent {
  categories$ = this.listCategoriesFacade.categories$;

  constructor(private listCategoriesFacade: ListCategoriesFacade) {}

  deleteCategory(id: string): void {
    this.listCategoriesFacade.deleteCategory(id);
  }
}
