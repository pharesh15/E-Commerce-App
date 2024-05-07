import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/modelType';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  productQuantity: number = 1;
  productDetails: undefined | Product;
  constructor(private activeRoute: ActivatedRoute, private productService: ProductService) {
    this.handleDetails();
  }

  handleDetails() {
    this.activeRoute.paramMap.subscribe((params) => {
      let productId = params.get('id');
      productId && this.productService.getProduct(productId).subscribe((result) => {
        if (result) {
          this.productDetails = result;
        } else {
          this.productDetails = undefined;
        }
      });
    })
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val == 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val == 'min') {
      this.productQuantity -= 1;
    }
  }

  handleAddToCart() {
    if (this.productDetails) {
      this.productDetails.quantity = this.productQuantity;
      if (!localStorage.getItem('userData')) {
        this.productService.localAddToCard(this.productDetails);
      }
    }
  }
}
