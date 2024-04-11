import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { ViewPokemonComponent } from './components/view-pokemon/view-pokemon.component';

export const routes: Routes = [
    {
        path: "",
        component: LandingComponent
    },
    {
        path: "pokemon/:id",
        component: ViewPokemonComponent
    }
];
