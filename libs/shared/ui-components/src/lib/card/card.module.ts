import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, OverlayModule],
  exports: [CardComponent],
})
export class CardModule {}
