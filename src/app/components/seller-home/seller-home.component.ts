import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/modelType';
import { CommonModule } from '@angular/common';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  productList: undefined | Product[];
  deleteProductMessage: string | undefined;
  deleteIcon = faTrash;
  updateIcon = faEdit;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProduct();
  }

  listProduct() {
    this.productService.listProduct().subscribe((result) => {
      this.productList = result;
    })
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.deleteProductMessage = "Product deleted successfully";
        this.listProduct();
      }

      setTimeout(() => {
        this.deleteProductMessage = undefined;
      }, 3000);
    })
  }
}
