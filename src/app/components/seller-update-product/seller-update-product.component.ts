import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/modelType';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
  productData: undefined | Product;
  updateProductMessage: undefined | string;
  constructor(private router: ActivatedRoute, private productService: ProductService, private route: Router) { }

  ngOnInit(): void {
    let id = this.router.snapshot.paramMap.get("id");
    id && this.productService.getProduct(id).subscribe((result) => {
      if (result) {
        this.productData = result;
      }
    });
  }

  handleUpdateProduct(data: Product) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.productService.updateProduct(data).subscribe((result) => {
      if (result) {
        this.updateProductMessage = "Product Updated Successfully";
      }

      setTimeout(() => {
        this.updateProductMessage = undefined;
        this.route.navigate(['/seller-home'])
      }, 3000);
    });
  }
}
