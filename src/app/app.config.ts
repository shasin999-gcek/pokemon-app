import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { POKEMON_BASE_PATH } from './variables';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    { provide: POKEMON_BASE_PATH, useValue: "https://pokeapi.co/api/v2"},
    importProvidersFrom(HttpClientModule),
  ]
};
