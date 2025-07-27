import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { initFlowbite } from 'flowbite';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading: boolean = false;
  msgError: string = "";
  msgSuccess: string = "";

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngAfterViewInit() {
    initFlowbite();
  }

  submitForm(): void {
    this.msgError = '';
    this.msgSuccess = '';

    if (this.loginForm.valid) {
      this.isLoading = true;

      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          if (res?.token) {
            const isAdmin = this.loginForm.value.username === 'kminchelle' &&
                            this.loginForm.value.password === 'klein1234';

            // تخزين البيانات
            setTimeout(() => {
              localStorage.setItem('userToken', res.token);
              localStorage.setItem('userInfo', JSON.stringify({ ...res, isAdmin }));

              this.authService.saveUserData(); 
              this.router.navigate(['/home']);
            }, 500);

            this.msgSuccess = 'Login successful';
          } else {
            this.msgError = 'Unexpected response from server';
          }

          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.msgError = 'Invalid username or password';
          this.isLoading = false;
        }
      });
    } else {
      this.msgError = 'Please fill in all fields correctly';
    }
  }
}
