import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';

import { ProductsService } from '../../core/services/products/products.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { TranslatePipe } from '@ngx-translate/core';
import { initFlowbite } from 'flowbite';
import { IProduct } from '../../shared/interfaces/iproduct';

@Component({
  selector: 'app-home',
  imports: [CarouselModule , RouterLink , UpperCasePipe , LowerCasePipe , TitleCasePipe, SlicePipe , CurrencyPipe , DatePipe , JsonPipe , AsyncPipe , TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  customMainSlider: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },

    }
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<i class" fas fa-previous"></i>', 'i class" fas fa-next"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  private readonly productsService = inject(ProductsService);
  private readonly cartService =inject(CartService);
  private readonly toastrService =inject(ToastrService);
  private readonly ngxSpinnerService =inject(NgxSpinnerService);

  products:IProduct[]=[]
  // categories:ICategory[]=[]


  ngOnInit(): void {
    this.getProductsData();


  }
  ngAfterViewInit() :void {
    initFlowbite();
  }


  getProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res);
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
}
