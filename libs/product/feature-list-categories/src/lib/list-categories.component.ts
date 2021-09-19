import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListCategoriesFacade } from '@esc/product/domain';
import { CategoryEntity } from '@esc/product/models';

@Component({
  selector: 'product-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.less'],
})
export class ListCategoriesComponent {
  constructor(
    private listCategoriesFacade: ListCategoriesFacade,
    private router: Router
  ) {}

  categories$ = this.listCategoriesFacade.categories$;

  deleteCategory(id: string): void {
    this.listCategoriesFacade.deleteCategory(id);
  }

  editCategory(id: string): void {
    this.router.navigate(['categories', 'form', id]);
  }

  sortByNameFn(left: CategoryEntity, right: CategoryEntity): number {
    return left.name.localeCompare(right.name);
  }
}
