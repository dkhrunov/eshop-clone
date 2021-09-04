import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';
import { IconModule } from '@ant-design/icons-angular';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, RouterModule, IconModule],
  exports: [SidebarComponent],
  providers: [],
})
export class SidebarModule {}
