import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewsCountPipe } from './views-count.pipe';
import { GetUsernamePipe } from './get-username.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ViewsCountPipe, GetUsernamePipe],
  exports: [ViewsCountPipe, GetUsernamePipe],
})
export class SharedUiPipesModule {}
