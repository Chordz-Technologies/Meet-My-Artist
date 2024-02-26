import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css']
})
export class WishlistPageComponent {
  organizers: any;

  constructor(private service: ServiceService, private activatedRoute: ActivatedRoute) { }

  public userId!: number;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.userId = val['uid'];
      this.service.getUserDetailsByID(this.userId)
        .subscribe({
          next: (res: any) => {
            this.organizers = res.user_list; 
          },
          error: (err: any) => {
            console.log(err);
          }
        })
    })
  }
}
