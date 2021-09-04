import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from '@esc/shared/ui-components';
import { UserFeatureShellModule } from '@esc/user/feature-shell';
import { RouterModule } from '@angular/router';
import { ProductFeatureShellModule } from '@esc/product/feature-shell';
import { HeaderModule, FooterModule } from '@esc/shared/ui-components';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CardModule,
    HeaderModule,
    FooterModule,
    ProductFeatureShellModule,
    UserFeatureShellModule,
    RouterModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
