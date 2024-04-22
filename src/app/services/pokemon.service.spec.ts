import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/Pokemon';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PokemonService);
    service['basePath'] = 'https://pokemon.com';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can test getPokemonList', () => {
    const samplePokemonListRes = {
      count: 1302,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=12&limit=12',
      previous: null,
      results: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
      ],
    };

    service
      .getPokemonList(0, 12)
      .subscribe((data) => expect(data).toEqual(samplePokemonListRes));

    const req = httpTestingController.expectOne(
      service['basePath'] + '/pokemon?limit=0&offset=12'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(samplePokemonListRes);
  });

  describe('Pokemon Details Api', () => {
    let samplePokemonDetailsRes: any;
    let expectedMappedData: any;
    beforeEach(() => {
      samplePokemonDetailsRes = {
        abilities: [
          {
            ability: {
              name: 'overgrow',
              url: 'https://pokeapi.co/api/v2/ability/65/',
            },
            is_hidden: false,
            slot: 1,
          },
          {
            ability: {
              name: 'chlorophyll',
              url: 'https://pokeapi.co/api/v2/ability/34/',
            },
            is_hidden: true,
            slot: 3,
          },
        ],
        base_experience: 64,
        height: 7,
        held_items: [],
        id: 1,
        is_default: true,
        name: 'bulbasaur',
        order: 1,
        species: {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
        },
        sprites: {
          other: {
            dream_world: {
              front_default:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
              front_female: null,
            },
          },
        },
        stats: [
          {
            base_stat: 45,
            effort: 0,
            stat: {
              name: 'hp',
              url: 'https://pokeapi.co/api/v2/stat/1/',
            },
          },
          {
            base_stat: 49,
            effort: 0,
            stat: {
              name: 'attack',
              url: 'https://pokeapi.co/api/v2/stat/2/',
            },
          },
        ],
        types: [
          {
            slot: 1,
            type: {
              name: 'grass',
              url: 'https://pokeapi.co/api/v2/type/12/',
            },
          },
          {
            slot: 2,
            type: {
              name: 'poison',
              url: 'https://pokeapi.co/api/v2/type/4/',
            },
          },
        ],
        weight: 69,
      };
      expectedMappedData = {
        id: 1,
        name: 'bulbasaur',
        imgSrc:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
        weight: 69,
        height: 7,
        ability: 'overgrow',
        stats: [
          { name: 'hp', value: 45, colorClass: 'primary' },
          { name: 'attack', value: 49, colorClass: 'danger' },
        ],
        species: {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
        },
      };
    });

    it('should return pokemon info', () => {
      service
        .getPokemonDetailsByUrl(service['pokemonListUrl'] + '/1')
        .subscribe((data) => expect(data).toEqual(expectedMappedData as any));

      const requests = httpTestingController.expectOne(
        service['pokemonListUrl'] + '/1'
      );
      expect(requests.request.method).toEqual('GET');
      requests.flush(samplePokemonDetailsRes);
    });

    it('should return pokemon info', () => {
      service.getPokemonDetailsById(1).subscribe((data) => {
        expect(data).toEqual(expectedMappedData as any);
      });

      const requests = httpTestingController.expectOne(
        service['pokemonListUrl'] + '/1'
      );
      expect(requests.request.method).toEqual('GET');
      requests.flush(samplePokemonDetailsRes);
    });
  });

  it('should return pokemon species response', () => {
    const pokemonSpeciesRes = {
      base_happiness: 50,
      capture_rate: 45,
      color: {
        name: 'green',
        url: 'https://pokeapi.co/api/v2/pokemon-color/5/',
      },
      evolution_chain: {
        url: 'https://pokeapi.co/api/v2/evolution-chain/1/',
      },
      evolves_from_species: null,
      flavor_text_entries: [
        {
          flavor_text:
            'A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.',
          language: {
            name: 'en',
            url: 'https://pokeapi.co/api/v2/language/9/',
          },
          version: {
            name: 'red',
            url: 'https://pokeapi.co/api/v2/version/1/',
          },
        },
        {
          flavor_text:
            'A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.',
          language: {
            name: 'en',
            url: 'https://pokeapi.co/api/v2/language/9/',
          },
          version: {
            name: 'blue',
            url: 'https://pokeapi.co/api/v2/version/2/',
          },
        },
      ],
      form_descriptions: [],
      forms_switchable: false,
      gender_rate: 1,
      order: 1,
      name: "bulbasaur"
    };
    const url = service['pokemonListUrl'] + '/pokemon-species/1/';
    service.getPokemonSpeciesByUrl(url).subscribe((data) => {
      expect(data?.name).toEqual("bulbasaur");
    });

    const requests = httpTestingController.expectOne(url);
    expect(requests.request.method).toEqual('GET');
    requests.flush(pokemonSpeciesRes);
  });

  it("should get evolution response if no cache", () => {
    const sampleEvolutionRes: any = {
      "baby_trigger_item": null,
      "chain": {
          "evolution_details": [],
          "evolves_to": [
              {
                  "evolution_details": [
                      {
                          "gender": null,
                          "held_item": null,
                          "item": null,
                          "known_move": null,
                          "known_move_type": null,
                          "location": null,
                          "min_affection": null,
                          "min_beauty": null,
                          "min_happiness": null,
                          "min_level": 16,
                          "needs_overworld_rain": false,
                          "party_species": null,
                          "party_type": null,
                          "relative_physical_stats": null,
                          "time_of_day": "",
                          "trade_species": null,
                          "trigger": {
                              "name": "level-up",
                              "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
                          },
                          "turn_upside_down": false
                      }
                  ],
                  "evolves_to": [
                      {
                          "evolution_details": [
                              {
                                  "gender": null,
                                  "held_item": null,
                                  "item": null,
                                  "known_move": null,
                                  "known_move_type": null,
                                  "location": null,
                                  "min_affection": null,
                                  "min_beauty": null,
                                  "min_happiness": null,
                                  "min_level": 32,
                                  "needs_overworld_rain": false,
                                  "party_species": null,
                                  "party_type": null,
                                  "relative_physical_stats": null,
                                  "time_of_day": "",
                                  "trade_species": null,
                                  "trigger": {
                                      "name": "level-up",
                                      "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
                                  },
                                  "turn_upside_down": false
                              }
                          ],
                          "evolves_to": [],
                          "is_baby": false,
                          "species": {
                              "name": "venusaur",
                              "url": "https://pokeapi.co/api/v2/pokemon-species/3/"
                          }
                      }
                  ],
                  "is_baby": false,
                  "species": {
                      "name": "ivysaur",
                      "url": "https://pokeapi.co/api/v2/pokemon-species/2/"
                  }
              }
          ],
          "is_baby": false,
          "species": {
              "name": "bulbasaur",
              "url": "https://pokeapi.co/api/v2/pokemon-species/1/"
          }
      },
      "id": 1
    };

    const url = service['pokemonListUrl'] + '/evolution-chain/1/';
    service.getEvolutionChainByUrl(url).subscribe((data) => {
      expect(service["evolutionChainResponseCache"][url]).toEqual(sampleEvolutionRes);
    });

    const requests = httpTestingController.expectOne(url);
    expect(requests.request.method).toEqual('GET');
    requests.flush(sampleEvolutionRes);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
