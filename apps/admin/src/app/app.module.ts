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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrderFeatureDashboardModule } from '@esc/order/feature-dashboard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { AuthInterceptor } from '@esc/shared/util-interceptors';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
