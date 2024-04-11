import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { POKEMON_BASE_PATH } from '../variables';
import { catchError, map, of, tap } from 'rxjs';
import { BaseStat, Pokemon, Species } from '../models/Pokemon';
import { StatColorMap } from '../constants/stat-colour';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  protected basePath = '';
  private evolutionChainResponseCache: any = {};

  constructor(
    private readonly http: HttpClient,
    @Optional() @Inject(POKEMON_BASE_PATH) basePath: string
  ) {
    this.basePath = basePath;
  }

  private get pokemonListUrl(): string {
    return this.basePath + '/pokemon';
  }

  getPokemonList(limit: number, offset: number) {
    const options = {
      params: new HttpParams().set('limit', limit).set('offset', offset),
    };
    return this.http.get(this.pokemonListUrl, options);
  }

  getPokemonDetailsById(id: number) {
    const url = this.pokemonListUrl + `/${id}`;
    return this.http.get(url).pipe(
      map((data) => this.mapPokemon(data)),
      catchError((e) => of(null))
    );
  }

  getPokemonDetailsByUrl(url: string) {
    return this.http.get(url).pipe(
      map((data) => this.mapPokemon(data)),
      catchError((e) => of(null))
    );
  }

  getPokemonSpeciesByUrl(url: string) {
    return this.http.get(url).pipe(
      map((pokemonSpecies: any) => ({
        name: pokemonSpecies?.name,
        url: url,
        description: this.getDescription(pokemonSpecies),
        evolutionUrl: pokemonSpecies?.evolution_chain?.url
      } as Species)),
      catchError((e) => of(null))
    );
  }

  getEvolutionChainByUrl(url: string) {
    if(this.evolutionChainResponseCache[url]) {
      return of(this.evolutionChainResponseCache[url]);
    }

    return this.http.get(url).pipe(
      tap((response: any) => {
        this.evolutionChainResponseCache = {};
        this.evolutionChainResponseCache[url] = response;
      }),
      catchError((e) => of(null))
    );
  }

  getDescription(pokemonSpecies: any) {
    for (let entry of pokemonSpecies.flavor_text_entries) {
      if (entry?.language?.name === "en") {
        return entry.flavor_text.replace(/\f/g, " ");
      }
    }
    return "";
  }

  mapPokemon(data: any): Pokemon {
    return {
      id: data?.id,
      name: data?.name,
      imgSrc: data?.sprites?.other?.dream_world?.front_default as string,
      weight: data?.weight,
      height: data?.height,
      ability: data?.abilities?.[0]?.ability?.name,
      stats: data?.stats.map(
        (stat: any) =>
          ({
            name: stat?.stat?.name,
            value: stat?.base_stat,
            colorClass: (<any>StatColorMap)[stat?.stat?.name],
          } as BaseStat)
      ),
      species: data?.species
    };
  }
}
