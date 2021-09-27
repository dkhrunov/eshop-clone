import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
} from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CategoryEntity } from '@esc/product/models';

@Component({
  selector: 'ui-categories-banner',
  templateUrl: './categories-banner.component.html',
  styleUrls: ['./categories-banner.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesBannerComponent {
  @Input() category: CategoryEntity | undefined = undefined;

  @HostBinding('style.background-color')
  get color(): string {
    return this.category ? `${this.category.color}50` : '';
  }
}
