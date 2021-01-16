import { Component, OnInit } from '@angular/core';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0;
  totalQuantity: number = 0;


  cartDown = faCartArrowDown;

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {
    this._cartService.totalPrice.subscribe(data => {
      this.totalPrice = data;
    });

    this._cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data;
    });


  }

}
