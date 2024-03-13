import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Services/service.service';
import { BehaviorSubject } from 'rxjs';

interface CategoryNode {
  name: string;
  children?: SubcategoryNode[];
}

interface SubcategoryNode {
  name: string;
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-artists-page',
  templateUrl: './artists-page.component.html',
  styleUrls: ['./artists-page.component.css']
})
export class ArtistsPageComponent implements OnInit {
  treeData$ = new BehaviorSubject<CategoryNode[]>([]);
  selectedCategory: string | null = null;
  selectedSubcategory: string | null = null;

  treeControl: FlatTreeControl<ExampleFlatNode>;
  treeFlattener: MatTreeFlattener<CategoryNode, ExampleFlatNode>;
  dataSource: MatTreeFlatDataSource<CategoryNode, ExampleFlatNode>;

  artists: any[] = [];
  filteredArtists: any[] = [];
  products: any[] = [];
  isUserLoggedIn: boolean = false; // Default value
  url = 'https://meetmyartist.beatsacademy.in/';
  modalDisplay = 'none';
  pageSize: number = 5;
  currentPage: number = 0;
  userType = localStorage.getItem('userType');

  openModal() {
    this.modalDisplay = 'block';
  }

  closeModal() {
    this.modalDisplay = 'none';
  }

  constructor(private service: ServiceService, private router: Router, private elRef: ElementRef) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      node => node.level,
      node => node.expandable,
      node => node.children
    );
    this.treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level,
      node => node.expandable
    );
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  ngOnInit(): void {
    this.fetchTreeData();
    this.getArtistList();
    this.getProductsList();

    // Check localStorage for user login status
    const status = localStorage.getItem('status');
    if (status === 'Active') {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
  }

  fetchTreeData() {
    this.service.allArtistCategoriesFilter().subscribe(data => {
      const categoryNodes: CategoryNode[] = data.all_categories.map((category: any) => ({
        name: category.cname,
        children: category.scname.map((subcategory: string) => ({ name: subcategory }))
      }));
      this.treeData$.next(categoryNodes);
      this.dataSource.data = categoryNodes;
    });
  }

  transformer = (node: CategoryNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  getArtistList() {
    this.service.getArtistDetails().subscribe({
      next: (res: any) => {
        this.artists = res.artists_list;
        this.filteredArtists = [...this.artists];
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
    this.filteredArtists = this.artists.slice(startIndex, endIndex);
    const artistsSection = this.elRef.nativeElement.querySelector('#artistsSection');
    if (artistsSection) {
      artistsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.applyPagination();
  }

  nodeClicked(node: CategoryNode | SubcategoryNode) {
    this.nodeClicked1(node.name);
  }

  nodeClicked1(categoryOrSubcategory: string | null) {
    if (!categoryOrSubcategory) {
      // Resetting filters when nothing is selected
      this.selectedCategory = null;
      this.selectedSubcategory = null;
      this.filteredArtists = [...this.artists];
      return;
    }

    if (this.isCategory(categoryOrSubcategory)) {
      // Category selected
      this.selectedCategory = categoryOrSubcategory;
      this.selectedSubcategory = null;

      // Filter artists based on selected category
      this.filteredArtists = this.artists.filter(artist => artist.acategory === this.selectedCategory);
    } else {
      // Subcategory selected
      this.selectedSubcategory = categoryOrSubcategory;

      // Filter artists based on selected category and subcategory
      this.filteredArtists = this.artists.filter(
        artist => artist.acategory === this.selectedCategory && artist.asubcategory === this.selectedSubcategory
      );
    }
  }

  isCategory(categoryOrSubcategory: string): boolean {
    const categoryNode = this.treeData$.getValue()?.find(category => category.name === categoryOrSubcategory);
    return !!categoryNode?.children?.length;
  }

  getSubcategories(categoryName: string): string[] {
    const categoryNode = this.treeData$.getValue()?.find(category => category.name === categoryName);
    return categoryNode ? categoryNode.children?.map(subcategory => subcategory.name) || [] : [];
  }

  categoryChanged() {
    // Reset selected subcategory when category changes
    this.selectedSubcategory = null;
  }

  getProductsList() {
    this.service.getProductDetails().subscribe({
      next: (res: any) => {
        this.products = res.all_products;
      },
      error: (err: any) => {
        alert(err);
      }
    });
  }

  isPastDate(date: Date): boolean {
    const today = new Date();
    return new Date(date) < today;
  }

  // Check if the booking is for today
  isBookedToday(date: Date): boolean {
    const today = new Date();
    return new Date(date).toDateString() === today.toDateString();
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
    this.router.navigate(['/artistProfile', uid]);
  }

  Subscription() {
    if (this.userType === 'user') {
      this.router.navigate(['/userSubscription']);
    } else if (this.userType === 'artist') {
      this.router.navigate(['/artistSubscription']);
    } else if (this.userType === 'organizer') {
      this.router.navigate(['/organizerSubscription']);
    } else {
      this.router.navigate(['/userSubscription']);
    }
  }
}
