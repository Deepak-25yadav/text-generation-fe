import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('text-generation-fe');
}
