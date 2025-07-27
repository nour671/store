// import { ICart } from 'src/app/core/interfaces/cart.interface';
import { CurrencyPipe, NgIf, NgFor } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';

import { initFlowbite } from 'flowbite';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ICart } from '../../shared/interfaces/icart';
import { Product } from '../../shared/interfaces/iorder';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, TranslatePipe, NgIf, NgFor],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  products:IProduct[]=[]

  cartDetails: ICart = {} as ICart;

    ngAfterViewInit() :void {
    initFlowbite();
  }


  ngOnInit(): void {
    // this.getCartData();
  }






  getCartData(): void {
    const userId = 1;
    const number = 1;
    this.cartService.getLoggedUserCart(userId ,number).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = {} as ICart;
        this.cartDetails = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  removeItem(id: number): void {
    const confirmation = confirm('Are you sure you want to remove this item from the cart?');
    if (confirmation) {
      this.cartService.removeSpecificCartItem(this.cartDetails, +id).subscribe({
        next: (res) => {
          this.cartDetails = {} as ICart;
          this.cartDetails = res;
          this.toastrService.success('Item removed successfully', 'Cart');
          this.cartService.cartNumber.next(res.numOfCartItems);
        },
        error: (err) => {
          console.log(err);
          this.toastrService.error('Failed to remove item', 'Cart');
        }
      });
    }
  }

  updateCount(id: number, newCount: number): void {
    this.cartService.updateCartQuantity(this.cartDetails, +id, newCount).subscribe({
      next: (res) => {
        this.cartDetails = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


}
