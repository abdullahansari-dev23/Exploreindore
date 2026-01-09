import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink, RouterOutlet],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

    @ViewChild('itinerarySlider', { static: false })
    itinerarySlider!: ElementRef<HTMLDivElement>;

    constructor(private router: Router) { }

    goThingsToDo() {
  this.router.navigate(['/Thingtodo']).then(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

  gowheretogo() {
  this.router.navigate(['/wheretogo']).then(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


    ngAfterViewInit(): void {
        this.scrollAnimations();
    }

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

    scrollAnimations() {
        /* ================= HERO ================= */
        gsap.from('.hero-title', {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out'
        });

        gsap.from('.hero-text', {
            y: 40,
            opacity: 0,
            delay: 0.3,
            duration: 1,
            ease: 'power3.out'
        });

        /* Parallax Video */
        gsap.to('.hero-video', {
            scale: 1.1,
            scrollTrigger: {
                trigger: '.hero-video',
                start: 'top top',
                scrub: true
            }
        });

        /* ================= THINGS TO DO ================= */
        gsap.utils.toArray('.things-card').forEach((card: any, i: number) => {
            gsap.from(card, {
                y: 80,
                opacity: 0,
                duration: 1,
                delay: i * 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%'
                }
            });
        });

        /* ================= DID YOU KNOW ================= */
        gsap.from('.did-you-know-left', {
            x: -120,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.did-you-know-left',
                start: 'top 80%'
            }
        });

        gsap.from('.did-you-know-right', {
            x: 120,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.did-you-know-right',
                start: 'top 80%'
            }
        });

        /* Parallax Background */
        gsap.to('.didyou-bg', {
            scale: 1.15,
            scrollTrigger: {
                trigger: '.didyou-bg',
                scrub: true
            }
        });

        /* ================= ITINERARIES ================= */
        gsap.from('.itinerary-title', {
            y: 60,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.itinerary-title',
                start: 'top 85%'
            }
        });

        gsap.utils.toArray('.itinerary-card').forEach((card: any, i: number) => {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%'
                }
            });
        });
    }
}
