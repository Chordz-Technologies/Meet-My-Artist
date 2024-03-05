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
  searchProducts: product_model[] = [];
  searchEvents: event_model[] = [];

  constructor(private route: ActivatedRoute, private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.searchTerm = params['term'];
        this.service.search(this.searchTerm).subscribe((data: any) => {
            if (data.status === 'success') {
                // Filter data into respective arrays
                this.searchArtists = data.data.User;
                this.searchProducts = data.data.Products;
                this.searchEvents = data.data.Events;
            } else {
                // Handle no results found
                this.searchArtists = [];
                this.searchProducts = [];
                this.searchEvents = [];
            }
        });
    });
}

viewArtist(artistId: number): void {
    this.router.navigate(['/artistProfile', artistId]);
}

// viewProduct(productId: number): void {
//     this.router.navigate(['/product', productId]);
// }

// viewEvent(eventId: number): void {
//     this.router.navigate(['/event', eventId]);
// }
}
