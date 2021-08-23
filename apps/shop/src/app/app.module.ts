import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from '@esc/shared/ui-components';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, CardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
