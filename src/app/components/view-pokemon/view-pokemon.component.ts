import { Component, Input, OnInit } from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonService } from '../../services/pokemon.service';
import { Observable, map, switchMap, tap } from 'rxjs';
import { Pokemon, Species } from '../../models/Pokemon';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { PokemonEvolutionComponent } from '../pokemon-evolution/pokemon-evolution.component';
import { SpinnerLoadingComponent } from '../spinner-loading/spinner-loading.component';

@Component({
  selector: 'app-view-pokemon',
  standalone: true,
  imports: [
    CommonModule,
    PokemonCardComponent,
    NgbNavModule,
    PokemonDetailsComponent,
    PokemonEvolutionComponent,
    SpinnerLoadingComponent
  ],
  templateUrl: './view-pokemon.component.html',
})
export class ViewPokemonComponent implements OnInit {
  /**
   * param id in route
   */
  @Input() id!: number;
  pokemon$!: Observable<Pokemon | null>;
  activeTabId = 1;

  constructor(private readonly pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemonDetails();
  }

  /**
   * Initialize pokemon$ to Observable
   * which returns pokemon details and species response
   */
  getPokemonDetails() {
    this.pokemon$ = this.pokemonService.getPokemonDetailsById(this.id).pipe(
      switchMap((pokemon: any) => 
        this.pokemonService.getPokemonSpeciesByUrl(pokemon.species.url).pipe(
          map((pokemonSpecies: Species | null) => ({ ...pokemon, species: pokemonSpecies } as Pokemon))
        )
      )
    )
  }
}
