import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IconService } from '@ant-design/icons-angular';
import {
  HomeOutline,
  ExportOutline,
  GroupOutline,
  BarsOutline,
  ShoppingCartOutline,
  UsergroupAddOutline,
} from '@ant-design/icons-angular/icons';

@Component({
  selector: 'ui-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  constructor(private iconService: IconService) {
    this.iconService.addIcon(
      ...[
        HomeOutline,
        ExportOutline,
        GroupOutline,
        BarsOutline,
        ShoppingCartOutline,
        UsergroupAddOutline,
      ]
    );
  }
}
