import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListCategoriesFacade } from '@esc/product/domain';
import { tap } from 'rxjs';

@Component({
  selector: 'ui-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesFormComponent {
  constructor(
    private fb: FormBuilder,
    private listCategoriesFacade: ListCategoriesFacade,
    private router: Router
  ) {}

  createdCategory$ = this.listCategoriesFacade.createdCategory$.pipe(
    tap((_) => {
      this.form.reset();
    })
  );

  form = this.fb.group({
    name: ['', Validators.required],
    icon: ['', Validators.required],
    color: ['', Validators.required],
    image: ['', Validators.required],
  });

  createCategory(): void {
    if (this.form.invalid) {
      return;
    }

    this.listCategoriesFacade.createCategory(this.form.getRawValue());
  }

  goBack(): void {
    this.router.navigate(['categories']);
  }
}
