import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPokemonComponent } from './view-pokemon.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon, Species } from '../../models/Pokemon';
import { of } from 'rxjs';

describe('ViewPokemonComponent', () => {
  let component: ViewPokemonComponent;
  let fixture: ComponentFixture<ViewPokemonComponent>;
  let pokemonService: PokemonService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPokemonComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    pokemonService = TestBed.inject(PokemonService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it("should getPokemonDetails", (done) => {
    const samplePokemonObj: Pokemon = {
      id: "1",
      name: "bulbasaur",
      imgSrc: "string",
      species: {
        url: "some url"
      } as any
    };
    const sampleSpeciesObj: Species = {
      name: samplePokemonObj?.name,
      url: "some url",
      description: "string",
      evolutionUrl: "string"
    };
    spyOn(pokemonService, "getPokemonDetailsById").and.returnValue(of(samplePokemonObj));
    spyOn(pokemonService, "getPokemonSpeciesByUrl").and.returnValue(of(sampleSpeciesObj));
    component.getPokemonDetails();
    component.pokemon$.subscribe({
      next(value) {
        expect(value).toEqual({ ...samplePokemonObj, species: sampleSpeciesObj});
        done();
      },
    })
  })
});
