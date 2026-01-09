import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
}

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink, HttpClientModule, FormsModule, CommonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
    @ViewChild('itinerarySlider', { static: false })
    itinerarySlider!: ElementRef<HTMLDivElement>;

    @ViewChild('heroVideo', { static: false })
    heroVideo!: ElementRef<HTMLVideoElement>;

    private videoPlayAttempted = false;

    // Contact form properties
    contactForm: ContactForm = {
        name: '',
        email: '',
        subject: '',
        message: ''
    };

    isSubmitting = false;
    submitMessage = '';
    submitStatus: 'success' | 'error' | '' = '';

    // API endpoint - update this with your backend URL
    private apiUrl = 'http://localhost:3000/api/contact';

    constructor(private router: Router, private http: HttpClient) { }

    goThingsToDo() {
        this.router.navigate(['/Thingtodo']);
    }

    onSubmitContact(event: Event): void {
        event.preventDefault();

        // Validate form
        if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.subject || !this.contactForm.message) {
            this.submitStatus = 'error';
            this.submitMessage = 'Please fill in all fields';
            this.clearMessageAfterDelay();
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.contactForm.email)) {
            this.submitStatus = 'error';
            this.submitMessage = 'Please enter a valid email address';
            this.clearMessageAfterDelay();
            return;
        }

        this.isSubmitting = true;
        this.submitMessage = '';
        this.submitStatus = '';

        // Submit to API
        this.http.post(this.apiUrl, this.contactForm).subscribe({
            next: (response: any) => {
                this.isSubmitting = false;
                this.submitStatus = 'success';
                this.submitMessage = response.message || 'Thank you for contacting us! We will get back to you soon.';

                // Reset form
                this.contactForm = {
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                };

                this.clearMessageAfterDelay();
            },
            error: (error) => {
                this.isSubmitting = false;
                this.submitStatus = 'error';
                this.submitMessage = error.error?.message || 'Failed to send message. Please try again later.';
                console.error('Contact form error:', error);
                this.clearMessageAfterDelay();
            }
        });
    }

    private clearMessageAfterDelay(): void {
        setTimeout(() => {
            this.submitMessage = '';
            this.submitStatus = '';
        }, 5000);
    }

    ngAfterViewInit(): void {
        // Wait for view to be fully initialized
        setTimeout(() => {
            // Attempt to play video
            this.playVideo();

            // Add event listeners for user interaction to start video
            this.addUserInteractionListeners();

            // Run animations
            this.scrollAnimations();
        }, 100);
    }

    private playVideo(): void {
        if (this.videoPlayAttempted) {
            return;
        }

        // Try to get video element from ViewChild or fallback to querySelector
        let videoElement: HTMLVideoElement | null = null;

        if (this.heroVideo?.nativeElement) {
            videoElement = this.heroVideo.nativeElement;
        } else {
            videoElement = document.querySelector('.hero-video') as HTMLVideoElement;
        }

        if (videoElement && typeof videoElement.play === 'function') {
            // Ensure it's muted for autoplay to work
            videoElement.muted = true;

            // Try to play
            const playPromise = videoElement.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        this.videoPlayAttempted = true;
                        console.log('Video started playing');
                    })
                    .catch((error) => {
                        // Autoplay was prevented, will try again on user interaction
                        console.log('Autoplay prevented - waiting for user interaction', error);
                    });
            }
        } else {
            console.log('Video element not found or not ready');
        }
    }

    private addUserInteractionListeners(): void {
        const playOnInteraction = () => {
            if (!this.videoPlayAttempted) {
                this.playVideo();
            }
            // Remove listeners after first successful play
            if (this.videoPlayAttempted) {
                document.removeEventListener('click', playOnInteraction);
                document.removeEventListener('scroll', playOnInteraction);
                document.removeEventListener('touchstart', playOnInteraction);
            }
        };

        document.addEventListener('click', playOnInteraction, { once: true });
        document.addEventListener('scroll', playOnInteraction, { once: true });
        document.addEventListener('touchstart', playOnInteraction, { once: true });
    }

    ngOnDestroy(): void {
        // Clean up all ScrollTrigger instances
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }

    slideLeft() {
        this.itinerarySlider.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
    }

    slideRight() {
        this.itinerarySlider.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
    }

    scrollAnimations() {
        // Clear any existing ScrollTrigger instances
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        /* ================= HERO ================= */
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            gsap.from('.hero-title', {
                y: 80,
                opacity: 0,
                duration: 1.2,
                ease: 'power4.out'
            });
        }

        const heroText = document.querySelector('.hero-text');
        if (heroText) {
            gsap.from('.hero-text', {
                y: 40,
                opacity: 0,
                delay: 0.3,
                duration: 1,
                ease: 'power3.out'
            });
        }

        /* Parallax Video */
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo) {
            gsap.to('.hero-video', {
                scale: 1.1,
                scrollTrigger: {
                    trigger: '.hero-video',
                    start: 'top top',
                    scrub: true
                }
            });
        }

        /* ================= THINGS TO DO ================= */
        const thingsCards = gsap.utils.toArray('.things-card');
        if (thingsCards.length > 0) {
            thingsCards.forEach((card: any, i: number) => {
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
        }

        /* ================= DID YOU KNOW ================= */
        const didYouKnowLeft = document.querySelector('.did-you-know-left');
        if (didYouKnowLeft) {
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
        }

        const didYouKnowRight = document.querySelector('.did-you-know-right');
        if (didYouKnowRight) {
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
        }

        /* Parallax Background */
        const didyouBg = document.querySelector('.didyou-bg');
        if (didyouBg) {
            gsap.to('.didyou-bg', {
                scale: 1.15,
                scrollTrigger: {
                    trigger: '.didyou-bg',
                    scrub: true
                }
            });
        }

        /* ================= ITINERARIES ================= */
        const itineraryTitle = document.querySelector('.itinerary-title');
        if (itineraryTitle) {
            gsap.from('.itinerary-title', {
                y: 60,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.itinerary-title',
                    start: 'top 85%'
                }
            });
        }

        const itineraryCards = gsap.utils.toArray('.itinerary-card');
        if (itineraryCards.length > 0) {
            itineraryCards.forEach((card: any, i: number) => {
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
}
