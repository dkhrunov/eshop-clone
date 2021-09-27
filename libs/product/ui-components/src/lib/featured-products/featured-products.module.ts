import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedProductsComponent } from './featured-products.component';



@NgModule({
  declarations: [
    FeaturedProductsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FeaturedProductsComponent
  ]
})
export class FeaturedProductsModule { }
