import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacypolicy',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './privacypolicy.component.html',
  styleUrl: './privacypolicy.component.css'
})
export class PrivacypolicyComponent {

}
