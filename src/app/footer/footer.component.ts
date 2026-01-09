import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

constructor(private Route: Router) {}

  goThingsToDo() {
    this.Route.navigate(['/Thingtodo']);
  }

  gowheretogo() {
    this.Route.navigate(['/wheretogo']);
  }

  goHistory() {
    this.Route.navigate(['/History']);
  }

  goPrivacyPolicy(){
    this.Route.navigate(['/PrivacyPolicy']);
  }

  
  
scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

  
}

