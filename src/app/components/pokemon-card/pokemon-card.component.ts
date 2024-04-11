import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../models/Pokemon';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  @Input({ required: true }) pokemon!: Pokemon;
  @Input({ required: false }) clickable: Boolean = true;
  @Output() cardClicked = new EventEmitter<Pokemon>();
}
