import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../model/modelType';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orderData: Order[] | undefined;
  constructor(private orderService: OrderService){}

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList(){
    const userData = localStorage.getItem('userData');
    const userId = userData && JSON.parse(userData).id;
    this.orderService.orderList(userId).subscribe((result) => {
      this.orderData = result;
    });
  }

  cancelOrder(id: string | undefined){
    id && this.orderService.deleteOrder(id).subscribe(() => {
      this.getOrderList();
    });
  }
}
