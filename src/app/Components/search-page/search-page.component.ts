import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/Services/service.service';
import { user_model, product_model, event_model } from 'src/app/model';

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.css']
})

export class SearchPageComponent implements OnInit {
    searchTerm: string = '';
    searchArtists: user_model[] = [];
    searchOrganizers: user_model[] = [];
    searchProducts: product_model[] = [];
    searchEvents: event_model[] = [];
    url = 'https://api.meetmyartist.in/';
    defaultImageUrl: string = './assets/event-poster.jpeg';

    constructor(private route: ActivatedRoute, private service: ServiceService, private router: Router) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.searchTerm = params['term'];
            this.service.search(this.searchTerm).subscribe((res: any) => {
                if (res.status === 'success') {
                    // Filter data into respective arrays
                    this.searchArtists = res.data.User.artists;
                    this.searchOrganizers = res.data.User.organizers
                    this.searchProducts = res.data.Products;
                    this.searchEvents = res.data.Events;
                } else {
                    // Handle no results found
                    this.searchArtists = [];
                    this.searchOrganizers = [];
                    this.searchProducts = [];
                    this.searchEvents = [];
                }
            });
        });
    }

    viewArtist(artistId: number): void {
        this.router.navigate(['/artistProfile', artistId]);
    }

    viewOrganizer(organizerId: number): void {
        this.router.navigate(['/organizerProfile', organizerId]);
    }

    // viewProduct(productId: number): void {
    //     this.router.navigate(['/product', productId]);
    // }

    // viewEvent(eventId: number): void {
    //     this.router.navigate(['/event', eventId]);
    // }
}
