import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'components-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
