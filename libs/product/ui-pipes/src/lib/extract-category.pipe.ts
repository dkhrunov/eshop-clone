import { Pipe, PipeTransform } from '@angular/core';
import { isCategory } from '@esc/shared/util-models';

@Pipe({
  name: 'extractCategory',
})
export class ExtractCategoryNamePipe implements PipeTransform {
  transform(value: unknown): string {
    return isCategory(value) ? value.name : 'None';
  }
}
