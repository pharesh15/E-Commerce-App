import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/modelType';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  productList: undefined | Product[];
  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.productService.listProduct().subscribe((result) => {
      this.productList = result;
    })
  }
}
 