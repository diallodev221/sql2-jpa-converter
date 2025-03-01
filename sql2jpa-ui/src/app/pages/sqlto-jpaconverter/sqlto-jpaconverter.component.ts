import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-sqlto-jpaconverter',
  standalone: true,
  imports: [],
  templateUrl: './sqlto-jpaconverter.component.html',
  styleUrl: './sqlto-jpaconverter.component.css',
})
export class SqltoJpaconverterComponent {
  showOptions = signal<boolean>(false);
  jpaOutput = signal<boolean>(false);
  isLoading = signal<boolean>(false);
}
