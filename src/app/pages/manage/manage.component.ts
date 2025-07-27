import { AsyncPipe, CommonModule, CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, NgClass, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
// import { Component, inject } from '@angular/core';
import { Component, inject } from '@angular/core';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ManageService } from './../../core/services/manage/manage.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage',
   imports: [ RouterLink,NgClass,CommonModule,FormsModule, UpperCasePipe ,TranslatePipe , LowerCasePipe , TitleCasePipe, SlicePipe , CurrencyPipe , DatePipe , JsonPipe , AsyncPipe],
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})

export class ManageComponent {
  private readonly manageService = inject(ManageService);
  private readonly router = inject(Router);
  private readonly toastrService =inject(ToastrService);
  products: IProduct[] = [];

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData(): void {
    this.manageService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  deleteProduct(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      this.manageService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== id);
          this.toastrService.success('Product deleted successfully');
        },
        error: (err) => {
          console.error(err);
          this.toastrService.error('Failed to delete product');
        }
      });
    }
  }

  addProduct(): void {
    this.router.navigate(['/add-product']);
  }

  editProduct(productId: number): void {
    this.router.navigate(['/edit-product', productId]);
  }
}
