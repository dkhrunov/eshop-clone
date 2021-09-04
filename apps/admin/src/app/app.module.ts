import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  HeaderModule,
  FooterModule,
  SidebarModule,
} from '@esc/shared/ui-components';
import { RouterModule } from '@angular/router';
import { ProductFeatureShellModule } from '@esc/product/feature-shell';
import { UserFeatureShellModule } from '@esc/user/feature-shell';
import { OrderFeatureShellModule } from '@esc/order/feature-shell';
import { HttpClientModule } from '@angular/common/http';
import { OrderFeatureDashboardModule } from '@esc/order/feature-dashboard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HeaderModule,
    FooterModule,
    SidebarModule,
    RouterModule.forRoot([]),
    ProductFeatureShellModule,
    UserFeatureShellModule,
    OrderFeatureShellModule,
    HttpClientModule,
    OrderFeatureDashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
