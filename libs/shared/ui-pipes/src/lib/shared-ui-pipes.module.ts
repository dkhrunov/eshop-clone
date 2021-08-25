import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewsCountPipe } from './views-count.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ViewsCountPipe
  ],
  exports: [
    ViewsCountPipe
  ],
})
export class SharedUiPipesModule {}
