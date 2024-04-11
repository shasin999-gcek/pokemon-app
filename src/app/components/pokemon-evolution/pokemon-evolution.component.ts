import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../models/Pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SpinnerLoadingComponent } from '../spinner-loading/spinner-loading.component';

@Component({
  selector: 'app-pokemon-evolution',
  standalone: true,
  imports: [ CommonModule, SpinnerLoadingComponent ],
  templateUrl: './pokemon-evolution.component.html',
  styleUrl: './pokemon-evolution.component.scss',
})
export class PokemonEvolutionComponent implements OnInit {
  @Input({ required: true }) pokemon!: Pokemon;
  speciesList$!: Observable<string[]>;

  constructor(private readonly pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getEvolutionChain();
  }

  getEvolutionChain() {
    this.speciesList$ = this.pokemonService.getEvolutionChainByUrl(
      this.pokemon?.species?.evolutionUrl as string
    ).pipe(
      map((evolution: any) => this.getSpeciesList(evolution?.chain))
    );
  }

  getSpeciesList(chain: any): string[] {
    let speciesList: string[] = [];
    const _getSpeciesList = (obj: any) => {
      speciesList.push(obj?.species?.name);
      if (obj?.evolves_to?.length > 0) {
        _getSpeciesList(obj.evolves_to[0]);
      }
    };
    _getSpeciesList(chain);
    return speciesList;
  }
}
