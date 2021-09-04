import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
