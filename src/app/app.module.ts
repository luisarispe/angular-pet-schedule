import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

//NGXS Store
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { environment } from 'src/environments/environment';

//Cambiar el locale de la app
import localEsCl from '@angular/common/locales/es-CL';
import { registerLocaleData } from '@angular/common';
import { LayoutModule } from './layouts/layout.module';
import { CoreModule } from './core/core.module';

//STATE
import { SpeciesState } from './store/species/species.state';
import { OwnersState } from './store/owners/owners.state';
import { PetsState } from './store/pets/pets.state';
import { UserState } from './store/user/user.state';
import { LoaderState } from './store/loader/loader.state';
registerLocaleData(localEsCl);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    LayoutModule,
    NgxsModule.forRoot(
      [SpeciesState, OwnersState, PetsState, UserState, LoaderState],
      {
        developmentMode: !environment.production,
      }
    ),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
    }),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-CL' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
