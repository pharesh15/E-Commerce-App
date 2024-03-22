import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/modelType';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  popularProducts: undefined | Product[];
  trendyProducts: undefined | Product[];

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.getPopularProducts();
    this.getTrendyProducts();
  }

  getPopularProducts(){
    this.productService.popularProducts(3).subscribe((result) => {
      if(result){
        this.popularProducts = result;
      }
    });
  }

  getTrendyProducts(){
    this.productService.trendyProducts(8).subscribe((result) => {
      if(result){
        this.trendyProducts = result;
      }
    });
  }
}
