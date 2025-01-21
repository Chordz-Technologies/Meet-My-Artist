import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Services/service.service';

interface Category {
  name: string;
  image: string;
  description: string;
  artistCount: number;
  size?: 'normal' | 'large' | 'wide';
}

interface Benefit {
  icon: string;
  text: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  artists: any[] = [];
  products: any[] = [];
  url = 'https://api.meetmyartist.in/';
  userType = localStorage.getItem('userType');

  categories: Category[] = [
    {
      name: 'Singer',
      image: './assets/categories/female-singer.webp',
      description: 'Book professional singers for your events and celebrations',
      artistCount: 150,
    },
    {
      name: 'Guitarist',
      image: './assets/categories/acoustic-guitar.webp',
      description: 'Professional guitar artists for your musical needs',
      artistCount: 80,
    },
    {
      name: 'Anchor',
      image: './assets/categories/anchoring2.webp',
      description: 'Expert hosts to make your event memorable',
      artistCount: 45,
    },
    {
      name: 'Actor',
      image: './assets/categories/actors.webp',
      description: 'Talented performers for shows and events',
      artistCount: 95,
    },
    {
      name: 'Musician',
      image: './assets/categories/musician.webp',
      description: 'Skilled musicians across various instruments',
      artistCount: 120,
    },
    {
      name: 'Sound System',
      image: './assets/categories/sound-system.webp',
      description: 'Professional audio equipment and services',
      artistCount: 30,
    },
    {
      name: 'Dancer',
      image: './assets/categories/daancing.webp',
      description: 'Energetic dancers for performances',
      artistCount: 85,
    },
    {
      name: 'Emcee',
      image: './assets/categories/emcee.webp',
      description: 'Professional event hosts and presenters',
      artistCount: 40,
    },
    {
      name: 'Celebrity',
      image: './assets/categories/celebrity.webp',
      description: 'Book your favorite celebrities',
      artistCount: 25,
    },
    {
      name: 'Reel Star',
      image: './assets/categories/reel-star.webp',
      description: 'Popular social media personalities',
      artistCount: 60,
    },
    {
      name: 'Magician',
      image: './assets/categories/megecian.webp',
      description: 'Amazing magicians for entertainment',
      artistCount: 35,
    },
    {
      name: 'Karaoke',
      image: './assets/categories/karaoke.webp',
      description: 'Complete karaoke setup with equipment',
      artistCount: 50,
    },
  ];

  organizerBenefits: Benefit[] = [
    { icon: 'fas fa-clock', text: 'Time and Cost Savings' },
    { icon: 'fas fa-comments', text: 'Communication Tools' },
    { icon: 'fas fa-bullhorn', text: 'Promotion and Marketing' },
    { icon: 'fas fa-shopping-cart', text: 'Sales Opportunities' },
    { icon: 'fas fa-network-wired', text: 'Networking and Collaboration' },
    {
      icon: 'fas fa-mobile-alt',
      text: 'Accessibility and Mobile Responsiveness',
    },
  ];

  artistBenefits: Benefit[] = [
    { icon: 'fas fa-star', text: 'Exposure and Visibility' },
    { icon: 'fas fa-images', text: 'Portfolio Management' },
    { icon: 'fas fa-dollar-sign', text: 'Sales Opportunities' },
    { icon: 'fas fa-users', text: 'Networking and Collaboration' },
    { icon: 'fas fa-calendar-alt', text: 'Event Opportunities' },
    { icon: 'fas fa-mobile-alt', text: 'Mobile-Friendly Experience' },
    { icon: 'fas fa-hands-helping', text: 'Support and Community Building' },
  ];

  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getArtistList();
    this.getProductsList();
  }

  getArtistList() {
    this.service.getArtistDetails().subscribe({
      next: (res: any) => {
        this.artists = res.artists_list.slice(0, 3);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getProductsList() {
    this.service.getProductDetails().subscribe({
      next: (res: any) => {
        this.products = res.all_products.slice(0, 4);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
