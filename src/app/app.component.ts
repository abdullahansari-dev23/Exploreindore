import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root', 
  standalone: true,
  imports: [RouterOutlet, RouterLink, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Exploreindore';

  constructor(private router: Router) {}

  goThingsToDo() {
    this.router.navigate(['/Thingtodo']);
  }

  gowheretogo() {
    this.router.navigate(['/wheretogo']);
  }

  goHistory() {
    this.router.navigate(['/History']);
  }


  @ViewChild('itinerarySlider', { static: false })
  itinerarySlider!: ElementRef<HTMLDivElement>;

  slideLeft() {
    this.itinerarySlider.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }

  slideRight() {
    this.itinerarySlider.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }



}
 

