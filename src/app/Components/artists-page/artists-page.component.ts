import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
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

  treeControl: FlatTreeControl<ExampleFlatNode>; // Declare treeControl
  treeFlattener: MatTreeFlattener<CategoryNode, ExampleFlatNode>;
  dataSource: MatTreeFlatDataSource<CategoryNode, ExampleFlatNode>;

  artists: any[] = [];
  filteredArtists: any[] = [];
  products: any[] = [];
  isUserLoggedIn: any;
  modalDisplay = 'none';

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
  }

  fetchTreeData() {
    this.service.allArtistCategoriesFilter().subscribe(data => {
      const categoryNodes: CategoryNode[] = data.all_categories.map((category: any) => ({
        name: category.cname,
        children: category.scname.map((subcategory: string) => ({ name: subcategory }))
      }));
      this.treeData$.next(categoryNodes);
      this.dataSource.data = categoryNodes; // Set the fetched data to the dataSource
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
        this.filteredArtists = [...this.artists]; // Initialize filteredArtists with all artists
      },
      error: (err: any) => {
        console.error('Error:', err);
        alert('Error fetching data. Check the console for details.');
      },
    });
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

  onLinkClick(event: MouseEvent, link: string): void {
    if (!this.isUserLoggedIn) {
        event.preventDefault();
        event.stopPropagation();
        return;
    }
    // Redirect logic for logged-in users
    window.location.href = link;
}

getMsg() {
  alert("Register First...");
}

  navigateToProfile(uid: number) {
    this.router.navigate(['/artistProfile', uid]);
  }
}
