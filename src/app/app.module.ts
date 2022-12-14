import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

//Cambiar el locale de la app
import localEsCl from '@angular/common/locales/es-CL';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localEsCl);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-CL' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
