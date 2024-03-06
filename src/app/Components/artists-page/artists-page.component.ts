import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.applyPagination();
  }

  nodeClicked(node: CategoryNode | SubcategoryNode) {
    const category = this.selectedCategory;
    const subcategory = node.name;
    const category1 = node.name;
    this.selectedCategory = category;
    this.filteredArtists = this.artists.filter(artist => artist.acategory === category);
    this.filteredArtists = this.artists.filter(artist => artist.acategory === category1 || artist.asubcategory === subcategory);
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
}
