import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'viewsCount',
})
export class ViewsCountPipe implements PipeTransform {
  transform(count: number): string {
    const countLength = count.toString().length;

    if (countLength > 6) {
      return `${(count / 1_000_000).toFixed(1)}M views`;
    }

    if (countLength >= 4) {
      return `${Math.trunc(count / 1_000)}K views`;
    }

    if (countLength <= 3) {
      return `${count} views`;
    }

    return 'No views';
  }
}
