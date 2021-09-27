import { ConnectedPosition } from '@angular/cdk/overlay';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
} from '@angular/core';
import {
  differenceInDays,
  differenceInHours,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
} from 'date-fns';

export interface ICard {
  cover: string;
  title: string;
  channelName: string;
  channelVerified: boolean;
  views: number;
  published: Date;
  avatar: string;
  durationInSeconds: number;
}

@Component({
  selector: 'ui-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() data!: ICard;

  @HostBinding('class.horizontal')
  @Input()
  horizontal = false;

  menuIsOpen = false;

  positions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
    },
  ];

  get duration(): string {
    const hours = Math.floor(this.data.durationInSeconds / 3600);
    const minutes = Math.floor(
      (this.data.durationInSeconds - hours * 3600) / 60
    );
    const seconds = this.data.durationInSeconds - hours * 3600 - minutes * 60;
    let H, M, S;

    if (seconds < 10) S = '0' + seconds;
    if (minutes < 10 && hours) M = '0' + minutes;

    return hours !== 0
      ? (H || hours) + ':' + (M || minutes) + ':' + (S || seconds)
      : (M || minutes) + ':' + (S || seconds);
  }

  get timeAgo(): string {
    const years = differenceInYears(new Date(), this.data.published);

    const months = differenceInMonths(new Date(), this.data.published);

    const weeks = differenceInWeeks(new Date(), this.data.published);

    const days = differenceInDays(new Date(), this.data.published);

    const hours = differenceInHours(new Date(), this.data.published);

    let result = `${years} ${years > 1 ? 'years' : 'year'}`;

    if (!years) {
      result = `${months} ${months > 1 ? 'months' : 'month'}`;
    }

    if (!months) {
      result = `${weeks} ${weeks > 1 ? 'weeks' : 'week'}`;
    }

    if (!weeks) {
      result = `${days} ${days > 1 ? 'days' : 'day'}`;
    }

    if (!days) {
      result = `${hours} ${hours > 1 ? 'hours' : 'hour'}`;
    }

    return result;
  }
}
