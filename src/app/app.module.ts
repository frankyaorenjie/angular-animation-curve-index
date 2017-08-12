import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';


@NgModule ({
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  providers: [
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {
  }
}

