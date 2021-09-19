import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListProductsFacade } from '@esc/product/domain';
import { ListCategoriesFacade } from '@esc/product/domain';
import {
  CategoryEntity,
  CreateProductDto,
  ProductEntity,
} from '@esc/product/models';
import { isFormEdited } from '@esc/shared/util-helpers';

import {
  combineLatest,
  filter,
  map,
  merge,
  pluck,
  shareReplay,
  startWith,
  take,
  tap,
} from 'rxjs';

@Component({
  selector: 'ui-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent {
  constructor(
    private fb: FormBuilder,
    private listProductsFacade: ListProductsFacade,
    private router: Router,
    private route: ActivatedRoute,
    private listCategoriesFacade: ListCategoriesFacade
  ) {}

  form = this.fb.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    price: ['', Validators.required],
    category: ['', Validators.required],
    countInStock: ['', Validators.required],
    description: ['', Validators.required],
    richDescription: [''],
    image: [],
    isFeatured: [false],
  });

  updateProductId: string | undefined = undefined;

  categories$ = this.listCategoriesFacade.categories$;

  productSaved$ = merge(
    this.listProductsFacade.createdProduct$,
    this.listProductsFacade.updatedProduct$
  ).pipe(
    tap(() => {
      this.form.reset();
    })
  );

  productForEdit$ = combineLatest([
    this.listProductsFacade.productById$.pipe(
      tap(
        ({
          name,
          brand,
          price,
          countInStock,
          category,
          isFeatured,
          description,
          richDescription,
          image,
        }) => {
          this.form.setValue({
            name,
            brand,
            price,
            countInStock,
            category,
            isFeatured,
            description,
            richDescription,
            image,
          });
        }
      )
    ),
    this.route.params.pipe(
      pluck('id'),
      filter(Boolean),
      tap((id) => {
        this.updateProductId = id;
        this.listProductsFacade.getProductById(id);
      })
    ),
  ]).pipe(take(1), shareReplay(1));

  categoryForEdit$ = this.productForEdit$.pipe(
    map(([{ category }]) => category as unknown as CategoryEntity)
  );

  uploadedImageUrl$ = merge(
    this.listCategoriesFacade.uploadedImageUrl$.pipe(
      pluck('imageUrl'),
      tap((url) => this.form.patchValue({ image: url }))
    ),
    this.productForEdit$.pipe(map(([{ image }]) => image))
  );

  formEdited$ = combineLatest([this.productForEdit$, this.form.valueChanges])
    .pipe(
      map(([[product], changes]) =>
        isFormEdited<ProductEntity, CreateProductDto>(product, changes)
      )
    )
    .pipe(startWith(false));

  uploadImage(event: any): void {
    const image: File = event.target.files[0];

    if (image) {
      const formData = new FormData();
      formData.append('image', image, image.name);

      this.listCategoriesFacade.uploadImage(formData);
    }
  }

  createProduct(): void {
    this.form.valid &&
      this.listProductsFacade.createProduct(this.form.getRawValue());
  }

  updateProduct(): void {
    this.form.valid &&
      this.updateProductId &&
      this.listProductsFacade.updateProduct(
        this.updateProductId,
        this.form.getRawValue()
      );
  }

  goBack(): void {
    this.router.navigate(['products']);
  }
}
