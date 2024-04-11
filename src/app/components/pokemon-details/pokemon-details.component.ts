import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../models/Pokemon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent {
  @Input({ required: true }) pokemon!: Pokemon;
}
