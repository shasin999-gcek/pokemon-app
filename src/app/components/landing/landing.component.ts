import { Component, OnInit } from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { Pokemon } from '../../models/Pokemon';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { Observable, finalize, forkJoin, map, switchMap, tap } from 'rxjs';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ShimmerUiComponent } from '../shimmer-ui/shimmer-ui.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, NgbPaginationModule, ShimmerUiComponent ],
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  totalCount = 0;
  page = 0;
  readonly pageSize = 12;
  isLoading = true;

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getPokemonList();
  }

  /**
   * Gets pokemon list
   */
  getPokemonList() {
    this.isLoading = true;
    this.pokemonService
      .getPokemonList(this.pageSize, (this.page - 1) * this.pageSize)
      .pipe(
        tap((pokemonList: any) => (this.totalCount = pokemonList?.count ?? 0)),
        switchMap((pokemonList: any) => this.fetchPokemonDetails(pokemonList?.results)),
        map((pokemonDetails: any) => this.mapPokemonData(pokemonDetails)),
        finalize(() => this.isLoading = false)
      )
      .subscribe();
  }

  
  /**
   * Fetches pokemon details
   * @param pokemonList 
   * @returns Observable<{ [key: string]: string}>
   */
  fetchPokemonDetails(pokemonList: any[]) {
    let source$: { [key: string]: Observable<any> };
    source$ = pokemonList.reduce((result, pokemon) => {
      return {
        ...result,
        [pokemon?.name]: this.pokemonService.getPokemonDetailsByUrl(pokemon?.url),
      };
    }, {});
    return forkJoin(source$);
  }
  
  /**
   * Maps pokemon data
   * @param pokemonDetails 
   * @returns pokemon data 
   */
  mapPokemonData(pokemonDetails: any) {
    this.pokemonList = [];
    for(let pokemonName in pokemonDetails) {
      this.pokemonList.push(pokemonDetails[pokemonName])
    }
    return pokemonDetails;
  }

  
  /**
   * Reload page with updated page details
   * @param event 
   */
  changePage(event: any) {
    this.getPokemonList();
  }

  /**
   * Views pokemon
   * @param pokemon 
   * navigates to details page
   */
  viewPokemon(pokemon: Pokemon): void {
    this.router.navigate(["pokemon", pokemon.id]);
  }
}
