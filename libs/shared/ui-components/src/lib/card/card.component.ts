import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import {
  differenceInDays,
  differenceInHours,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
  parse,
} from 'date-fns';

export interface ICard {
  cover: string;
  title: string;
  channelName: string;
  views: number;
  published: string;
  avatar: string;
  durationInSeconds: number;
}

@Component({
  selector: 'components-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() data!: ICard;

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
    const years = differenceInYears(
      new Date(),
      parse(this.data.published, 'MM/dd/yyyy', new Date())
    );

    const months = differenceInMonths(
      new Date(),
      parse(this.data.published, 'MM/dd/yyyy', new Date())
    );

    const weeks = differenceInWeeks(
      new Date(),
      parse(this.data.published, 'MM/dd/yyyy', new Date())
    );

    const days = differenceInDays(
      new Date(),
      parse(this.data.published, 'MM/dd/yyyy', new Date())
    );

    const hours = differenceInHours(
      new Date(),
      parse(this.data.published, 'MM/dd/yyyy', new Date())
    );

    let result = `${years} years`;

    if (!years) {
      result = `${months} months`;
    }

    if (!months) {
      result = `${weeks} weeks`;
    }

    if (!weeks) {
      result = `${days} days`;
    }

    if (!days) {
      result = `${hours} hours`;
    }

    return result;
  }
}
