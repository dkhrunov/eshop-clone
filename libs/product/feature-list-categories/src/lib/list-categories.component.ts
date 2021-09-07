import { Component } from '@angular/core';
import { ListCategoriesFacade } from '@esc/product/domain';
import { IconService } from '@ant-design/icons-angular';

import {
  LaptopOutline,
  HeartOutline,
  CameraOutline,
  WomanOutline,
} from '@ant-design/icons-angular/icons';

@Component({
  selector: 'product-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.less'],
})
export class ListCategoriesComponent {
  categories$ = this.listCategoriesFacade.categories$;

  constructor(
    private iconService: IconService,
    private listCategoriesFacade: ListCategoriesFacade
  ) {
    this.iconService.addIcon(
      ...[LaptopOutline, HeartOutline, CameraOutline, WomanOutline]
    );
  }

  deleteCategory(id: string): void {
    this.listCategoriesFacade.deleteCategory(id);
  }
}
