import { Component } from '@angular/core';

@Component({
  selector: 'app-shimmer-ui',
  standalone: true,
  imports: [],
  templateUrl: './shimmer-ui.component.html',
  styleUrl: './shimmer-ui.component.scss'
})
export class ShimmerUiComponent {
  readonly items = Array(8).fill(0);
}
