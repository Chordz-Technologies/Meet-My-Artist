import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Services/service.service';
import { BehaviorSubject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

interface CategoryNode {
  name: string;
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-organizer-page',
  templateUrl: './organizer-page.component.html',
  styleUrls: ['./organizer-page.component.css']
})
export class OrganizerPageComponent implements OnInit {
  treeData$ = new BehaviorSubject<CategoryNode[]>([]);
  selectedCategory: string | null = null;

  treeControl: FlatTreeControl<ExampleFlatNode>; // Declare treeControl
  treeFlattener: MatTreeFlattener<CategoryNode, ExampleFlatNode>;
  dataSource: MatTreeFlatDataSource<CategoryNode, ExampleFlatNode>;

  organizers: any[] = [];
  filteredOrganizers: any[] = [];
  isWishlist: boolean = false;
  loggedInUserId: number | undefined;
  wishlistIds: any;
  isUserLoggedIn: boolean = false; // Default value
  url = 'https://meetmyartist.beatsacademy.in/';
  modalDisplay = 'none';
  pageSize: number = 5;
  currentPage: number = 0;

  openModal() {
    this.modalDisplay = 'block';
  }

  closeModal() {
    this.modalDisplay = 'none';
  }

  constructor(private service: ServiceService, private router: Router) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      node => node.level,
      node => node.expandable,
      node => null // No children for the main categories
    );
    this.treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level,
      node => node.expandable
    );
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    // Retrieve userId from local storage in the constructor
    const storedUserId = localStorage.getItem('userId');
    this.loggedInUserId = storedUserId ? +storedUserId : undefined;
  }

  ngOnInit(): void {
    this.fetchTreeData();
    this.getOrganizersList();

    // Check localStorage for user login status
    const status = localStorage.getItem('status');
    if (status === 'Active') {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }

    // Retrieve wishlist IDs from local storage
    const storedWishlist = localStorage.getItem('wishlistIds');
    if (storedWishlist) {
      this.wishlistIds = JSON.parse(storedWishlist);
      this.updateWishlistIcons();
    }
  }

  updateWishlistIcons() {
    // Update isWishlist property of organizers based on wishlistIds
    this.organizers.forEach(organizer => {
      organizer.isWishlist = this.wishlistIds.includes(organizer.uid);
    });
  }

  fetchTreeData() {
    this.service.allOrganizerCategoriesFilter().subscribe(data => {
      const categoryNodes: CategoryNode[] = data.all_bcategories.map((category: any) => ({
        name: category.businesscategory
      }));
      this.treeData$.next(categoryNodes);
      this.dataSource.data = categoryNodes; // Set the fetched data to the dataSource
    });
  }

  transformer = (node: CategoryNode, level: number) => {
    return {
      expandable: true, // Always set to true for arrows on all categories
      name: node.name,
      level: level,
    };
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  getOrganizersList() {
    this.service.getOrganizerDetails().subscribe({
      next: (res: any) => {
        this.organizers = res.organizers_list;
        // Assuming res.organizers_list contains the list of organizers from the API
        // this.organizers = res.organizers_list.map((organizer: any) => {
        //   return {
        //     ...organizer,
        //     isWishlist: false // Add isWishlist property to each organizer
        //   };
        // });
        this.filteredOrganizers = [...this.organizers]; // Initialize filteredOrganizers with all organizers
        this.applyPagination();
      },
      error: (err: any) => {
        console.error('Error:', err);
        alert('Error fetching data. Check the console for details.');
      },
    });
  }

  applyPagination() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredOrganizers = this.organizers.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.applyPagination();
  }

  toggleWishlist(organizer: any) {
    organizer.isWishlist = !organizer.isWishlist;

    if (this.loggedInUserId !== undefined) {
      // Initialize wishlistIds to an empty array if it's undefined
      if (!this.wishlistIds) {
        this.wishlistIds = [];
      }

      // Check if organizer ID exists in wishlistIds
      const index = this.wishlistIds.indexOf(organizer.uid);

      if (index !== -1) {
        // Organizer ID exists in wishlist, so remove it
        this.wishlistIds.splice(index, 1);

        // Call remove API
        this.service.removeWishlistByID(this.loggedInUserId, organizer.uid)
          .subscribe({
            next: (response: any) => {
              console.log('Removed from wishlist:', response);
              // Handle success response as needed
            },
            error: (error: any) => {
              console.error('Error removing from wishlist:', error);
              // Handle error as needed
            }
          });
      } else {
        // Organizer ID does not exist in wishlist, so add it
        this.wishlistIds.push(organizer.uid);

        // Call add API
        this.service.postToWishlist(this.loggedInUserId, organizer.uid)
          .subscribe({
            next: (response: any) => {
              console.log('Added to wishlist:', response);
              // Handle success response as needed
            },
            error: (error: any) => {
              console.error('Error adding to wishlist:', error);
              // Handle error as needed
            }
          });
      }
    } else {
      console.error('User ID is not defined.');
      // Handle the case where user ID is not defined, such as displaying an error message
    }
  }

  updateLocalStorage() {
    localStorage.setItem('wishlistIds', JSON.stringify(this.wishlistIds));
  }

  nodeClicked(node: CategoryNode) {
    const category = node.name;
    this.selectedCategory = category;
    this.filteredOrganizers = this.organizers.filter(organizer => organizer.obusinesscategory === category);
  }

  onLinkClick(event: MouseEvent, link: string): void {
    event.preventDefault();
    if (!this.isUserLoggedIn) {
      this.openModal();
    } else {
      const newTab = window.open(link, '_blank');
      if (newTab) {
        newTab.focus();
      } else {
        window.location.href = link;
      }
    }
  }

  navigateToProfile(uid: number) {
    this.router.navigate(['/organizerProfile', uid]);
  }
}
