import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.css']
})
export class LoadingBarComponent {
  protected readonly loader = inject(LoadingService);
}


