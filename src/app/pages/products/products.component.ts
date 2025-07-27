import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from './../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule,  NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-products',
  imports: [ RouterLink,NgClass,CommonModule,FormsModule, UpperCasePipe ,TranslatePipe , LowerCasePipe , TitleCasePipe, SlicePipe , CurrencyPipe , DatePipe , JsonPipe , AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService =inject(ToastrService);

    products:IProduct[]=[]
    searchTerm: string = '';
    sortOption: string = '';



    ngOnInit(): void {
      this.getProductsData();



    }

    getProductsData():void {
      this.productsService.getAllProducts().subscribe({
        next:(res)=>{
          // console.log(res.data);
          console.log('Products API Response:', res);
          this.products = res
        },
        error:(err)=>{
          console.log(err);

        }

      })

    }


  addCartItem(userId: number, productId: number, quantity: number):void{
    this.cartService.addProductToCart(userId, productId, quantity).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status ==='success'){
          this.toastrService.success(res.message ,'Fresh Cart' );
          this.cartService.cartNumber.next(res.numOfCartItems);


        }


      },
      error:(err)=>{
        console.log(err);

      }
    })

  }

   // Filtered + Sorted Products
  filteredProducts(): IProduct[] {
    let filtered = this.products.filter((prod) =>
      prod.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // Sorting Logic
    switch (this.sortOption) {
      case 'priceLowToHigh':
        return filtered.sort((a, b) => a.price - b.price);
      case 'priceHighToLow':
        return filtered.sort((a, b) => b.price - a.price);
      case 'nameAZ':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  }




}
