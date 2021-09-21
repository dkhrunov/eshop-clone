import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListCategoriesFacade } from '@esc/product/domain';
import { sortByNameFn } from '@esc/shared/util-helpers';

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

  sortByNameFn = sortByNameFn;

  deleteCategory(id: string): void {
    this.listCategoriesFacade.deleteCategory(id);
  }

  editCategory(id: string): void {
    this.router.navigate(['categories', 'form', id]);
  }
}
