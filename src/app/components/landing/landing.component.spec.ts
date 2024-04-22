import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonService } from '../../services/pokemon.service';
import { of } from 'rxjs';
import { Router, provideRouter } from '@angular/router';
import { Pokemon } from '../../models/Pokemon';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let pokemonService: PokemonService;
  let router: Router;
  let samplePokemonObj: Pokemon;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingComponent, HttpClientTestingModule],
      providers: [ provideRouter([])]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    pokemonService = TestBed.inject(PokemonService)
    router = TestBed.inject(Router);
    samplePokemonObj = {
      id: "1",
      name: "bulbasaur",
      imgSrc: "string",
      species: null as any
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set totalCount after getPokemonList get called', () => {
    const samplePokemonListRes = {
        "count": 1302,
        "next": "https://pokeapi.co/api/v2/pokemon?offset=12&limit=12",
        "previous": null,
        "results": [
            {
                "name": "bulbasaur",
                "url": "https://pokeapi.co/api/v2/pokemon/1/"
            },
        ]
    };
    spyOn(component, "mapPokemonData");
    spyOn(pokemonService, "getPokemonDetailsByUrl").and.returnValue(of(samplePokemonObj));
    spyOn(pokemonService, "getPokemonList").and.returnValue(of(samplePokemonListRes));
    component.getPokemonList();
    expect(component.totalCount).toEqual(1302);
    expect(component.mapPokemonData).toHaveBeenCalledWith({
      bulbasaur: samplePokemonObj
    });
  });

  it('should navigate to pokemon details page when viewPokemon gets called', () => {
    spyOn(router, "navigate");
    component.viewPokemon(samplePokemonObj);
    expect(router.navigate).toHaveBeenCalledWith(["pokemon", "1"]);
  });

  it('should call getPokemonList when changePage gets called', () => {
    spyOn(component, "getPokemonList");
    component.changePage({});
    expect(component.getPokemonList).toHaveBeenCalled();
  });

  it('should return list of pokemon on mapPokemonData call', () => {
    component.mapPokemonData({
      bulbasaur: {...samplePokemonObj}
    });
    expect(component.pokemonList).toEqual([
      samplePokemonObj
    ]);
  });
});
