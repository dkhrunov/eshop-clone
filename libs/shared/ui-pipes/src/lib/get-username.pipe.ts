import { Pipe, PipeTransform } from '@angular/core';
import { isUser } from '@esc/shared/util-models';

@Pipe({
  name: 'getUsername',
})
export class GetUsernamePipe implements PipeTransform {
  transform(value: unknown): string {
    if (isUser(value)) {
      return value.name;
    }
    return '';
  }
}
