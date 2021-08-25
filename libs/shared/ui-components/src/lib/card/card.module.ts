import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedUiPipesModule } from '@esc/shared/ui-pipes';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, OverlayModule, SharedUiPipesModule],
  exports: [CardComponent],
})
export class CardModule {}
