import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from '@esc/shared/ui-components';
import { UserFeatureShellModule } from '@esc/user/feature-shell';
import { RouterModule } from '@angular/router';
import { ProductFeatureShellModule } from '@esc/product/feature-shell';
import { HeaderModule, FooterModule } from '@esc/shared/ui-components';
import { HomeComponent } from './home.component';
import { BannerModule } from '@esc/shared/ui-components';
import { CategoriesBannerModule } from '@esc/product/ui-components';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CardModule,
    HeaderModule,
    FooterModule,
    BannerModule,
    NzIconModule,
    ProductFeatureShellModule,
    CategoriesBannerModule,
    UserFeatureShellModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
