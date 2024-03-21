import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/modelType';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchResult: undefined | Product[];
  constructor(private activeRoute: ActivatedRoute, private productService: ProductService){
    this.handleSearch();
  }

  handleSearch(){
    this.activeRoute.paramMap.subscribe((params) => {
      let query = params.get('query');
      query && this.productService.searchProduct(query).subscribe((result) => {
        this.searchResult = result;
      })
    })
  }
}
