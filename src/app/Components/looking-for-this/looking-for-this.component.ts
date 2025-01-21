import { Component } from '@angular/core';

interface ExploreItem {
  title: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-looking-for-this',
  templateUrl: './looking-for-this.component.html',
  styleUrls: ['./looking-for-this.component.css'],
})
export class LookingForThisComponent {
  exploreItems: ExploreItem[] = [
    {
      title: 'Recording Studio',
      image: './assets/looking-for/studio.png',
      description:
        'Professional recording studios with state-of-the-art equipment and experienced sound engineers.',
    },
    {
      title: 'Banquet Hall',
      image: './assets/looking-for/hall.png',
      description:
        'Elegant banquet halls for all your special occasions, with modern amenities and professional staff.',
    },
    {
      title: 'Lawns',
      image: './assets/looking-for/lawns.png',
      description:
        'Beautiful outdoor spaces perfect for weddings, parties, and corporate events.',
    },
    {
      title: 'Event Management',
      image: './assets/looking-for/event.png',
      description:
        'Complete event planning and management services for seamless experiences.',
    },
    {
      title: 'Caterers',
      image: './assets/looking-for/caterers.png',
      description:
        'Expert catering services offering diverse cuisines and professional presentation.',
    },
    {
      title: 'Customized Dress',
      image: './assets/looking-for/dress.png',
      description:
        'Bespoke clothing design and tailoring services for your special occasions.',
    },
    {
      title: 'Restaurants',
      image: './assets/looking-for/restaurants.png',
      description:
        'Fine dining establishments with exquisite menus and ambient atmospheres.',
    },
    {
      title: 'Bar + Restaurants',
      image: './assets/looking-for/resto-bar.png',
      description:
        'Premium dining and drinking experiences with extensive beverage selections.',
    },
  ];
}
